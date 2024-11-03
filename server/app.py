from flask import Flask, request, jsonify
from models import db, Service, Question, Answer, UserQuote, UserAnswer

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///quotesystem.db'
db.init_app(app)

# API to get all services
@app.route('/api/services', methods=['GET'])
def get_services():
    services = Service.query.all()
    service_data = [{'id': service.id, 'name': service.name, 'description': service.description} for service in services]
    return jsonify(service_data)

# API to get questions based on selected services
@app.route('/api/questions', methods=['POST'])
def get_questions():
    service_ids = request.json.get('service_ids')
    questions = Question.query.filter(Question.service_id.in_(service_ids)).all()
    question_data = []
    for question in questions:
        answers = [{'id': answer.id, 'text': answer.text, 'price': answer.price} for answer in question.answers]
        question_data.append({
            'id': question.id,
            'text': question.text,
            'answers': answers
        })
    return jsonify(question_data)

# API to create a quote
@app.route('/api/quote', methods=['POST'])
def create_quote():
    answers = request.json.get('answers')
    total_price = 0
    quote = UserQuote(total_price=0)
    db.session.add(quote)
    db.session.commit()  # Commit to generate quote ID

    for question_id, answer_id in answers.items():
        answer = Answer.query.get(int(answer_id))
        if answer:
            total_price += answer.price
            user_answer = UserAnswer(
                user_quote_id=quote.id,
                question_id=question_id,
                answer_id=answer.id
            )
            db.session.add(user_answer)
    
    quote.total_price = total_price
    db.session.commit()
    
    return jsonify({'total_price': total_price})

if __name__ == '__main__':
    app.run(debug=True)
