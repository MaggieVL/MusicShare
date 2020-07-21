const extend = require('indicative/validator').extend;
const validations = require('indicative/validator').validations;
const validator = require('indicative').validator;
const getValue = require('indicative-utils').getValue;
const skippable = require('indicative-utils').skippable;

extend('imageURL', {
    async: true,
    async validate(data, field, args, config) {
        const fieldValue = getValue(data, field);

        if (skippable(fieldValue, field, config)) {
            return true;
        }

        try {
            await validator.validate(data, { [field]: 'url' });
            return true;
        } catch {
            const regex = RegExp('^data:(.+)?(;base64)?,.+');
            return regex.test(data);
        }
    }
});

const rules = {
    username: 'required|string',
    email: 'required|email',
    password: 'required|min:8',
    age: 'required|integer|above:0',
    genres: 'required|array',
    imageURL: 'required|imageURL',
};

module.exports = rules;
