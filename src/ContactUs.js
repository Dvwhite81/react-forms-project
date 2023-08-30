import { useEffect, useState } from "react";

function ContactUs() {
  // State variables
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [staff, setStaff] = useState("");
  const [bio, setBio] = useState("");
  const [signup, setSignup] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const [hasSubmitted, setHasSubmitted] = useState(false);

  // Email validator
  const isEmail = (email) =>
    /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);

  // Phone number validator
  const isPhone = (phone) =>
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gim.test(phone);

  useEffect(() => {
    const errors = [];

    if (!name.length) errors.push("Please enter a name");
    if (!email.length) errors.push("Please enter an email");
    if (!isEmail(email)) errors.push("Please enter a valid email");
    if (!isPhone(phone)) errors.push("Please enter a valid phone number");
    if (phone.length && phoneType === "")
      errors.push("Please select a phone type");
    if (bio.length > 280) errors.push("Bio must be less than 280 characters");

    setValidationErrors(errors);
  }, [name, email, phone, phoneType, bio]);

  const onSubmit = (e) => {
    // Prevent reload on submit
    e.preventDefault();

    setHasSubmitted(true);

    if (validationErrors.length)
      return alert("Cannot submit. Please fix errors.");

    // New object for info
    const contactUsInformation = {
      name,
      email,
      phone,
      phoneType,
      staff,
      bio,
      signup,
      submittedOn: new Date(),
    };

    console.log(contactUsInformation);

    // Reset form
    setName("");
    setEmail("");
    setPhone("");
    setPhoneType("");
    setStaff("");
    setBio("");
    setSignup(false);
    setHasSubmitted(false);
  };

  return (
    <div>
      {hasSubmitted && validationErrors.length > 0 && (
        <div>
          The following errors were found:
          <ul>
            {validationErrors.map((error) => (
              <li key={error}>{error}</li>
            ))}
          </ul>
        </div>
      )}

      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            id="email"
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone:</label>
          <input
            id="phone"
            type="text"
            onChange={(e) => setPhone(e.target.value)}
            value={phone}
          />
          <select
            name="phoneType"
            onChange={(e) => setPhoneType(e.target.value)}
            value={phoneType}
          >
            <option value="" disabled>
              Select a phone type...
            </option>
            <option>Home</option>
            <option>Work</option>
            <option>Mobile</option>
          </select>
        </div>
        <fieldset onChange={(e) => setStaff(e.target.value)}>
          <legend>Select your role:</legend>
          <div>
            <label htmlFor="teacher">Teacher</label>
            <input id="teacher" type="radio" name="staff" value="teacher" />
          </div>
          <div>
            <label htmlFor="student">Student</label>
            <input id="student" type="radio" name="staff" value="student" />
          </div>
        </fieldset>
        <div>
          <label htmlFor="bio">Bio:</label>
          <textarea
            id="bio"
            name="bio"
            onChange={(e) => setBio(e.target.value)}
            value={bio}
          />
        </div>
        <div>
          <label htmlFor="signup">Sign up for email notifications</label>
          <input
            id="signup"
            type="checkbox"
            onChange={(e) => setSignup(e.target.checked)}
            checked={signup}
          />
        </div>
        <button>Submit</button>
      </form>
    </div>
  );
}

export default ContactUs;
