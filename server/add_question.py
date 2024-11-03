from app import app, db, Service, Question

# Adding answers to an existing question
with app.app_context():
    # Retrieve the Service to which you're adding answers
    service = Service.query.filter_by(id=1).first()

    # Insert values into the new answers
    addquestion = Question(service_id = service.id , text = "Which Analytics do you want?")

    # Add questions to the database session
    db.session.add(addquestion)

    # Commit the session to persist data
    db.session.commit()

    print(f"Questions added into {service.name}")
