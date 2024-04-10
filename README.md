# @ouroboros/define

[![npm version](https://img.shields.io/npm/v/@ouroboros/define.svg)](https://www.npmjs.com/package/@ouroboros/define) ![MIT License](https://img.shields.io/npm/l/@ouroboros/define.svg)

Define uses JSON as a language independant way to describe data types that can then be validated, and in the case of all strings form data, cleaned up and turned into the appropriate variable type.

## Install
```bash
npm install @ouroboros/define
```

## Using
Defining data can be done at runtime with Objects and Arrays, but one of the advantages of creating definition files in JSON is being able to share them with your back end system to allow validating data with the same rules on the server.

user.json
```json
{
	"id": "uuid4",
	"email": {
		"__type__": "string",
		"__regex__": ""
	},
	"name": {
		"first": "string",
		"middle": {
			"__type__": "string",
			"__maximum__": 1,
			"__optional__": true
		},
		"last": "string"
	},
	"address": {
		"line1": "string",
		"line2": {
			"__type__": "string",
			"__optional__": true
		},
		"city": "string",
		"state": {
			"__type__": "string",
			"__regex__": "[A-Z]{2}"
		},
		"country": {
			"__type__": "string",
			"__options__": [ "CA", "MX", "US" ]
		}
	},
	"phone": "string",
	"dob": {
		"__type__": "date",
		"__optional__": true
	},
	"height": {
		"feet": {
			"__type__": "uint",
			"__maximum__": 7
		},
		"inches": {
			"__type__": "uint",
			"__maximum__": 11
		},
		"__optional__": true
	}
}
```

Once defined, the data can be used in JavaScript using the available classes.

user.js
```javascript
import { Parent } from '@ouroboros/define';

// Load the file
import definition from 'user.json';

// Create the Parent instance
const parent = new Parent(definition);

// Test data
let data = {
	'id': '52cd4b20-ca32-4433-9516-0c8684ec57c2',
	'email': 'chris@domain.com',
	'name': {
		'first': 'Chris',
		'last': 'Nasr'
	},
	'address': {
		'line1': '123 Main Street',
		'state': 'QC',
		'country': 'CA'
	},
	'phone': '(888) 555-1234',
	'height': {
		'feet': '5',
		'inches': '11'
	}
}

if(!parent.valid(data)) {
	console.log(tree.validationFailures);
	// [ [ 'address.city', 'missing' ] ]
}

// Clean the data
data = tree.clean(data);
/* data = {
  ...
  height: {
    'feet': 5,
    'inches': 11
  }
} */
```

## Extending
Any fields marked by two leading and trailing underscores is considered a special value and can be accessed using the `special` method. This can be used to add details only relevent to a specific system, either directly, or through the use of classes that inherit the Define classes.

For example, a class that handles creating forms (check out [@ouroboros/define-mui](https://www.npmjs.com/package/@ouroboros/define-mui)) to enter the data might need a title to display the form field.

user.json
```json
{
	...
	"name": {
		"first": {
			"__type__": "string",
			"__maximum__": 32,
			"__title__": "Given Name"
		},
		"middle": {
			"__type__": "string",
			"__maximum__": 1,
			"__optional__": true,
			"__title__": "Middle Initial"
		},
		"last": {
			"__type__": "string",
			"__maximum__": 32,
			"__title__": "Surname"
		}
	},
	...
}
```

Or, if we don't want this data in the shared file, we can add it at runtime and let the class merge the two.

user.js
```javascript
...
// Create the Parent instance
const parent = new Parent(definition, {
	'name': {
		'__title__': 'Given Name'
	},
	'middle': {
		'__title__': 'Middle Initial'
	},
	'last': {
		'__title__': 'Surname'
	}
})
...
```
 Then we can access that data at runtime

```javascript
...
// Get the SQL type for the first name field
const nameFirstTitle = parent.get('name').get('first').special('title');
```

## Documentation
Full documentation, including information on using Arrays and dynamic Objects, as well as how to handle errors, can be found on [ouroboroscoding.com/define](https://ouroboroscoding.com/define)