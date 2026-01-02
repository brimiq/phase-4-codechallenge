from config import app, db
from flask import request, jsonify
from models import Hero, Power, HeroPower

# -------------------
# GET all heroes
# -------------------
@app.route('/heroes', methods=['GET'])
def get_heroes():
    heroes = Hero.query.all()
    return jsonify([{'id': h.id, 'name': h.name, 'super_name': h.super_name} for h in heroes])

# -------------------
# GET hero by ID
# -------------------
@app.route('/heroes/<int:id>', methods=['GET'])
def get_hero(id):
    hero = Hero.query.get(id)
    if hero:
        return jsonify(hero.to_dict())
    return jsonify({'error': 'Hero not found'}), 404

# -------------------
# GET all powers
# -------------------
@app.route('/powers', methods=['GET'])
def get_powers():
    powers = Power.query.all()
    return jsonify([p.to_dict() for p in powers])

# -------------------
# GET power by ID
# -------------------
@app.route('/powers/<int:id>', methods=['GET'])
def get_power(id):
    power = Power.query.get(id)
    if power:
        return jsonify(power.to_dict())
    return jsonify({'error': 'Power not found'}), 404

# -------------------
# PATCH update power
# -------------------
@app.route('/powers/<int:id>', methods=['PATCH'])
def update_power(id):
    power = Power.query.get(id)
    if not power:
        return jsonify({'error': 'Power not found'}), 404

    data = request.get_json()
    try:
        power.description = data.get('description', power.description)
        db.session.commit()
        return jsonify(power.to_dict())
    except Exception as e:
        return jsonify({'errors': [str(e)]}), 400

# -------------------
# POST create HeroPower
# -------------------
@app.route('/hero_powers', methods=['POST'])
def create_hero_power():
    data = request.get_json()
    try:
        hp = HeroPower(
            strength=data['strength'],
            hero_id=data['hero_id'],
            power_id=data['power_id']
        )
        db.session.add(hp)
        db.session.commit()
        return jsonify(hp.to_dict()), 201
    except Exception as e:
        return jsonify({'errors': [str(e)]}), 400

# -------------------
if __name__ == '__main__':
    app.run(debug=True, port=5555)
