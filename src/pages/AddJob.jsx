import React, { useEffect, useState } from "react";
import { Button, SelectBox, TextInput } from "../components";
import bannerImg from "../assets/banner.png";
import { useParams } from "react-router-dom";

function AddJob() {
  const { id } = useParams();

  const currentDate = getCurrentDate();

  const initialFormValue = {
    title: "",
    company: "",
    location: "",
    link: "",
    contact: "",
    skills: "",
    responsibility: "",
    description: "",
    pay: "",
    posted_on: getCurrentDate(),
    status: "applied",
  };

  const [formValue, setFormValue] = useState(initialFormValue);
  const [formError, setFormError] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (values) => {
    const { title, company, location, link } = values;
    const errors = {};

    // validate title
    if (!title?.length) {
      errors.title = "Job Title is required";
    } else if (title.length < 3) {
      errors.title = "Job Title isn't valid";
    }

    if (!company?.length) {
      errors.company = "Company is required";
    } else if (company.length < 3) {
      errors.company = "Company isn't valid";
    }

    if (!location?.length) {
      errors.location = "Location is required";
    } else if (location.length < 3) {
      errors.location = "Location isn't valid";
    }

    if (!link?.length) {
      errors.link = "Job Post Link is required";
    } else if (
      !link.includes("https://") ||
      !link.includes(".") ||
      link.split("https://")[1].length < 3 ||
      link.split(".")[1].length < 2
    ) {
      errors.link = "Job Post Link isn't valid";
    }

    const err = Object.values(errors);

    setFormError(errors);

    if (err.length) {
      console.log(err);
      return false;
    }

    return true;
  };

  const handleChange = (e) => {
    setFormValue((pre) => ({ ...pre, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitted(true);

    if (validateForm(formValue)) {
      console.log({ formValue });

      try {
        let apiUrl;
        if (id) {
          apiUrl = `http://localhost:5000/jobs/${id}`;
        } else {
          apiUrl = `http://localhost:5000/jobs`;
        }

        const response = await fetch(apiUrl, {
          method: id ? "PATCH" : "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValue),
        });

        if (!response.ok) {
          throw new Error(`Failed to ${id ? "edit" : "add"} job`);
        }

        const result = await response.json();
        console.log(`Job ${id ? "edited" : "added"} successfully:`);

        setFormValue(initialFormValue);
        setFormError({});
        setIsSubmitted(false);
      } catch (error) {
        console.error(`Error ${id ? "editing" : "adding"} job:`, error);
      }
    }
  };

  useEffect(() => {
    if (isSubmitted) {
      validateForm(formValue);
    }
  }, [formValue]);

  // console.log({ formValue });

  useEffect(() => {
    if (id) {
      getJobById(id)
        .then((data) => {
          console.log("data", data);
          setFormValue((pre) => ({
            ...pre,
            ...data,
            posted_on: getCurrentDate(data?.posted_on),
          }));
        })
        .catch((error) => console.error("Error fetching job:", error));
    }
  }, [id]);

  console.log({ formValue });

  return (
    <div className="h-full">
      <h1 className="text-2xl font-bold">{id ? "Edit" : "Add"} Job</h1>

      <div className=" flex">
        {/* Left side - Image */}
        <div className="w-1/2 pt-8">
          <img
            src={bannerImg}
            alt="Add Job"
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Right side - Form */}
        <div className="w-1/2 p-8 h-full overflow-auto">
          <form className="grid grid-cols-2 gap-4">
            <TextInput
              name="title"
              placeHolder="Job Title"
              onChange={handleChange}
              value={formValue.title}
              error={formError?.title}
            />
            <TextInput
              name="company"
              placeHolder="Company"
              onChange={handleChange}
              value={formValue?.company}
              error={formError?.company}
            />
            <TextInput
              name="location"
              placeHolder="Location"
              onChange={handleChange}
              value={formValue?.location}
              error={formError?.location}
            />
            <TextInput
              name="pay"
              placeHolder="Pay"
              onChange={handleChange}
              value={formValue?.pay}
              error={formError?.pay}
            />
            <TextInput
              name="contact"
              placeHolder="Contact"
              onChange={handleChange}
              value={formValue?.contact}
            />
            <TextInput
              name="link"
              placeHolder="Link"
              onChange={handleChange}
              value={formValue?.link}
              error={formError?.link}
            />
            <TextInput
              name="skills"
              placeHolder="Skills"
              onChange={handleChange}
              datavalue={formValue?.skills}
              textarea
            />
            <TextInput
              name="responsibility"
              placeHolder="Responsibility"
              onChange={handleChange}
              datavalue={formValue?.responsibility}
              textarea
            />
            <TextInput
              name="description"
              placeHolder="Description"
              textarea
              onChange={handleChange}
              datavalue={formValue?.description}
            />
            <div className="flex flex-col justify-between">
              <TextInput
                name="posted_on"
                placeHolder="Posted on"
                onChange={handleChange}
                type="date"
                value={formValue?.posted_on || currentDate}
              />
              <SelectBox
                name="status"
                onChange={handleChange}
                value={formValue?.status || "applied"}
              />
            </div>
            {/* <span></span> */}
            <Button title="Submit" onClick={handleSubmit} classes="bg-secondary-bg" />
          </form>
        </div>
      </div>
    </div>
  );
}

export default AddJob;

function getCurrentDate(dateParam) {
  const date = dateParam ? new Date(dateParam) : new Date();
  return date.toISOString().split("T")[0];
}

async function getJobById(id) {
  try {
    const response = await fetch(`http://localhost:5000/jobs/${id}`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching job:", error);
    return [];
  }
}
