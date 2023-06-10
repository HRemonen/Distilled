import datetime

from marshmallow import Schema, fields, validate

class NewWhiskeySchema(Schema):
    name = fields.String(required=True)
    distillery_id = fields.UUID(required=True)
    type = fields.String(required=True)
    age = fields.Integer(required=True, validate=validate.Range(min=0, max=datetime.datetime.now().year))
    description = fields.String(required=False)
    
class UpdatedWhiskeySchema(Schema):
    description = fields.String(required=True)