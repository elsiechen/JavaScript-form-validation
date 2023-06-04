const firstName = document.querySelector('#first-name');
const lastName = document.querySelector('#last-name');
const zip = document.querySelector('#zip');
const country = document.querySelector('#country')
const pwd = document.querySelector('#pwd');
const pwdConfirm = document.querySelector('#confirm');
const submitBtn = document.querySelector('#submit-btn');

const checkName = (name) => {
    if (name.validity.tooShort || name.validity.tooLong) {
        name.setCustomValidity('Please enter a name between 2 to 10 characters.');
        name.reportValidity();
        console.log('check name ...')
    } else if (name.validity.valueMissing) {
        name.setCustomValidity('Please enter a name.');
        name.reportValidity();
    } else {
        name.setCustomValidity('');
    }
};

const checkZIP = () => {
    // For each country, defines the pattern that the ZIP has to follow
    const constraints = {
      ch: [
        "^(CH-)?\\d{4}$",
        "Switzerland ZIPs must have exactly 4 digits: e.g. CH-1950 or 1950",
      ],
      fr: [
        "^(F-)?\\d{5}$",
        "France ZIPs must have exactly 5 digits: e.g. F-75012 or 75012",
      ],
      de: [
        "^(D-)?\\d{5}$",
        "Germany ZIPs must have exactly 5 digits: e.g. D-12345 or 12345",
      ],
      nl: [
        "^(NL-)?\\d{4}\\s*([A-RT-Z][A-Z]|S[BCE-RT-Z])$",
        "Netherland ZIPs must have exactly 4 digits, followed by 2 letters except SA, SD and SS",
      ],
      tw: [
        "^(TW-)?(\\d{3}|\\d{5}|\\d{6})$",
        "Taiwan ZIPs can have three or five or three digits: e.g. TW-247 or         24746 or 247460"
      ],
    };
  
    const zip = document.querySelector('#zip');
    const country = document.querySelector('#country').value;
    const constraint = new RegExp(constraints[country][0]);
  
    // Check it! expression.test(text)
    if (constraint.test(zip.value)) {
      // The ZIP follows the constraint, we use the ConstraintAPI to tell it
      zip.setCustomValidity("");
    } else {
      // The ZIP doesn't follow the constraint, we use the ConstraintAPI to
      // give a message about the format required for this country
      zip.setCustomValidity(constraints[country][1]);
      zip.reportValidity();
    }
  }

const checkPwd = () => {
    if (pwd.validity.tooShort || pwd.validity.tooLong) {
        pwd.setCustomValidity('Please enter a password between 8 to 20 characters.');
        pwd.reportValidity();
    } else if (pwd.validity.valueMissing) {
        pwd.setCustomValidity('Please enter a password.');
        pwd.reportValidity();
    } else {
        pwd.setCustomValidity('');
    }
};

const checkConfirm = () => {
    if (pwd.value !== pwdConfirm.value) {
        pwdConfirm.setCustomValidity('Inconsistent password!');
        pwdConfirm.reportValidity();
    } else if (pwdConfirm.validity.valueMissing) {
        pwdConfirm.setCustomValidity('Please enter the password again.');
        pwdConfirm.reportValidity();
    } else {
        pwdConfirm.setCustomValidity('');
    }
    
};

const events = () => {
    firstName.addEventListener('input', () => {
        checkName(firstName);
    });
    lastName.addEventListener('input', () => {
        checkName(lastName);
    });
    zip.addEventListener('input', checkZIP);
    country.addEventListener('change', checkZIP);
    pwd.addEventListener('input', checkPwd);
    pwdConfirm.addEventListener('input', checkConfirm);
};

events();