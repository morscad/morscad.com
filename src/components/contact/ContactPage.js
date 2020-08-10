import React, { useState } from "react"

import TextField from "@material-ui/core/TextField"
import InputAdornment from "@material-ui/core/InputAdornment"

import "./ContactPage.scss"

const ContactPage = ({pageTitle}) => {
  const [isSent, send] = useState(false)
  const [values, setValues] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false,
  })

  const validateInput = type => {
    if (type === "email") {
      const emailregecx = /^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/
      return emailregecx.test(String(values.email).toLowerCase())
    } else if (type === "name" || type === "subject" || type === "message") {
      return values[type] !== ""
    }
  }
  const handleChange = prop => event => {
    setValues({ ...values, [prop]: event.target.value })
    setErrors({ ...errors, [prop]: !validateInput(prop) })
  }

  const sendMessage = () => {
    setErrors({
      name: !validateInput("name"),
      email: !validateInput("email"),
      subject: !validateInput("subject"),
      message: !validateInput("message"),
    })
    if (
      validateInput("name") &&
      validateInput("email") &&
      validateInput("subject") &&
      validateInput("message")
    ) {
      send(true)
    } else {
      return
    }
  }
  return (
    <section className={"contact"}>
      <h1 className={"titleContainer"}>{pageTitle.toUpperCase()}</h1>
      <div className={"inputWrapper"}>
        {!isSent && (
          <>
            <div className={"inputContainer"}>
              <TextField
                label="Your name"
                id="contact_name"
                variant="outlined"
                fullWidth
                error={errors.name}
                value={values.name}
                onChange={handleChange("name")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" />
                  ),
                }}
                size="small"
              />
            </div>

            <div className={"inputContainer"}>
              <TextField
                label="Your email"
                id="contact_email"
                variant="outlined"
                fullWidth
                error={errors.email}
                value={values.email}
                onChange={handleChange("email")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" />
                  ),
                }}
                size="small"
              />
            </div>
            <div className={"inputContainer"}>
              <TextField
                label="Subject"
                id="contact_subject"
                variant="outlined"
                fullWidth
                error={errors.subject}
                value={values.subject}
                onChange={handleChange("subject")}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start" />
                  ),
                }}
                size="small"
              />
            </div>
            <div className={"inputContainer"}>
              <TextField
                id="outlined-multiline-static"
                label="Message"
                multiline
                fullWidth
                rows={6}
                error={errors.message}
                value={values.message}
                onChange={handleChange("message")}
                variant="outlined"
              />
            </div>
            <div className={"submitContainer"}>
              <div
                className={"submitBtn"}
                onClick={() => {
                  sendMessage()
                }}
              >
                Send
              </div>
            </div>
          </>
        )}
        {isSent && (<div className={'confirmationMessage'}>Thank you for contacting me, I will be in touch as soon as possible</div>)}
      </div>
    </section>
  )
}

export default ContactPage
