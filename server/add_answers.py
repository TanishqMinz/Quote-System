from app import app, db, Question, Answer

# Adding answers to an existing question
with app.app_context():
    # Retrieve the question to which you're adding answers
    question = Question.query.filter_by(id=1).first()

    # Insert values into the new answers
    addanswer1 = Answer(question_id = question.id, text = "Average Page time", price = 100.0 )
    addanswer2 = Answer(question_id = question.id, text = "Pages viewed", price = 150.0)

    # Add answers to the database session
    db.session.add(addanswer1)
    db.session.add(addanswer2)


    # Commit the session to persist data
    db.session.commit()

    print(f"Answers added into {question.text}")
