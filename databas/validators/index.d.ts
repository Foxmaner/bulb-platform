declare module "validators" {

    type Integer = {
        type: Number,
        required: true,
        unique: true,
        validate: {
            validator: Number.isInteger,
            message: "{VALUE} is not an integer value"
        }
    }
}