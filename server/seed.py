from config import db, app
from models import Hero, Power, HeroPower

with app.app_context():
    db.drop_all()
    db.create_all()

    # Sample Heroes
    h1 = Hero(name="Kamala Khan", super_name="Ms. Marvel")
    h2 = Hero(name="Doreen Green", super_name="Squirrel Girl")
    db.session.add_all([h1, h2])

    # Sample Powers
    p1 = Power(name="super strength", description="gives the wielder super-human strengths")
    p2 = Power(name="flight", description="gives the wielder the ability to fly through the skies at supersonic speed")
    db.session.add_all([p1, p2])

    db.session.commit()

    # Sample HeroPowers
    hp1 = HeroPower(strength="Strong", hero_id=h1.id, power_id=p1.id)
    hp2 = HeroPower(strength="Average", hero_id=h2.id, power_id=p2.id)
    db.session.add_all([hp1, hp2])

    db.session.commit()
    print("Database seeded successfully!")
