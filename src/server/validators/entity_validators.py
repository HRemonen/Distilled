from marshmallow import Schema, fields, validate

class NewCommentSchema(Schema):
    comment = fields.String(required=True)
    
class NewRatingSchema(Schema):
    rating = fields.Integer(required=True, validate=validate.Range(min=0, max=5))