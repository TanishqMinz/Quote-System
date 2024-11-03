from app import app, db, Service

with app.app_context():
    # Make a new service object
    newservice = Service(name = "Analytics Integration", description = " Add services to monitor user involvement. ")

    # Add service into the database session
    db.session.add(newservice)

    # Commit the session to persist data
    db.session.commit()

    print(f'Service added : {newservice.name}')