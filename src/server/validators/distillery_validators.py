import datetime

from marshmallow import Schema, fields, validate

class NewDistillerySchema(Schema):
    name = fields.String(required=True)
    location = fields.Tuple((fields.Float(), fields.Float()), required=True)
    country = fields.String(required=True)
    year_established = fields.Integer(required=False, validate=validate.Range(min=0, max=datetime.datetime.now().year))
    website = fields.Url(required=False)
    
class UpdatedDistillerySchema(Schema):
    website = fields.Url(required=True)