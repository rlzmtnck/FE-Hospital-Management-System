import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";
import Modal from "../Modal";
import AddFacility from "../../hooks/AddFacility";

export default function ModalAddFacility(props) {
  const { open, onClose, refresh, setRefresh } = props;
  const { sendDataToServer, submitted } = AddFacility();

  const initState = {
    name: "",
    queue: "",
    capacity: "",
    location: "",
  };

  const initFormErr = {
    name: "",
    queue: "",
    capacity: "",
    location: "",
  };

  const [valueForm, setvalueForm] = useState(initState);
  const [submittedForm, setSubmittedForm] = useState(submitted);
  const [formErr, setformErr] = useState(initFormErr);

  const regexFacility = /^[a-zA-Z0-9 ]*$/;
  const regexNumber = /^[0-9]{1,3}$/;

  const onChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    if (name === "name") {
      if (regexFacility.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Invalid Facility Name" });
      }
    }

    if (name === "queue") {
      if (regexNumber.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Queue must be 1 -3 digits" });
      }
    }

    if (name === "capacity") {
      if (regexNumber.test(value)) {
        setformErr({ ...formErr, [name]: "" });
      } else {
        setformErr({ ...formErr, [name]: "Capacity must be 1 -3 digits" });
      }
    }

    if (name === "location") {
      if (regexFacility.test(value)) {
        setformErr({
          ...formErr,
          [name]: "",
        });
      } else {
        setformErr({
          ...formErr,
          [name]: "Invalid Location",
        });
      }
    }

    setvalueForm({
      ...valueForm,
      [name]: value,
    });
  };

  console.log(formErr);

  const onClick = (e) => {
    e.preventDefault();
    if (
      formErr.name === "" &&
      formErr.queue === "" &&
      formErr.capacity === "" &&
      formErr.location === ""
    ) {
      sendDataToServer(valueForm);
      setRefresh(false);
      setSubmittedForm(true);
    }
  };

  useEffect(() => {
    if (submittedForm === true) {
      onClose();
      setSubmittedForm(false);
      setRefresh(true);
    }
  }, [submitted, submittedForm, refresh]);

  return (
    <Modal title="Add Facility" open={open} onClose={onClose}>
      <form onSubmit={onClick}>
        <div className="my-4">
          <TextField
            {...(formErr.name !== ""
              ? { error: true, helperText: formErr.name }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="Facility"
            name="name"
            value={valueForm.name}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            {...(formErr.capacity !== ""
              ? { error: true, helperText: formErr.capacity }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="Capacity"
            name="capacity"
            type="number"
            value={valueForm.capacity}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            {...(formErr.location !== ""
              ? { error: true, helperText: formErr.location }
              : null)}
            fullWidth
            required
            id="outlined-basic"
            label="Location"
            name="location"
            value={valueForm.location}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="my-4">
          <TextField
            {...(formErr.queue !== ""
              ? { error: true, helperText: formErr.queue }
              : null)}
            fullWidth
            id="outlined-basic"
            label="Queue"
            name="queue"
            type="number"
            value={valueForm.queue}
            onChange={onChange}
            color="primary"
            variant="outlined"
            size="small"
          />
        </div>
        <div className="flex flex-col justify-center gap-2 mx-4  md:justify-end md:flex-row">
          <button onSubmit={onClick} className="btn-main btn-primary">
            Submit
          </button>
          <button className="btn-main btn-secondary" onClick={onClose}>
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
}
