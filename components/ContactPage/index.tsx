/** @jsxImportSource @emotion/react */
import React, { useRef, useState } from "react";
import * as styles from "./styles";
import { Button, Input } from "antd";
import Footer from "../Footer";
import emailjs from "@emailjs/browser";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import contact from "../../public/images/contact.jpeg";
import Image from "next/image";

const { TextArea } = Input;

const ContactPage: React.FC = () => {
  const form = useRef<HTMLFormElement>({} as HTMLFormElement);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  const sendMail = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    emailjs.sendForm('service_10h5qd8', 'template_loukpas', form.current, 'DLKw7z7iHWWxu8_pz')
      .then((result) => {
        setName("");
        setEmail("");
        setSubject("");
        setMessage("");
        toast("Message Sent Successfully");
      }, (error) => {
          console.log(error.text);
      });
  }

  return (
    <>
      <div css={styles.contactContainer}>
        <div css={styles.details}>
          <h1>Have Questions?</h1>
          <div>Please feel free to call or email us, or use our contact form to get in touch with us. We look forward to hearing from you!</div>
          <h4>Send Us Mail</h4>
          <div>docusmriti@gmail.com</div>
          <br />
          <Image src={contact} alt="" />
        </div>
        <div css={styles.form}>
          <div css={styles.formContainer}>
            <form ref={form} onSubmit={sendMail}>
              <Input value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Name"
                name="user_name"
              />
              <Input
                value={email}
                type="email"
                onChange={e => setEmail(e.target.value)}
                placeholder="Email Address"
                name="user_email"
              />
              <Input
                value={subject}
                onChange={e => setSubject(e.target.value)}
                placeholder="Subject"
                name="subject"
              />
              <TextArea
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="Your Message"
                name="message"
              />
              <button type="submit">SEND MESSAGE</button >
            </form>
          </div>
        </div>
      </div>
      <Footer />
      <ToastContainer position="bottom-left" />
    </>
  );
}

export default ContactPage;