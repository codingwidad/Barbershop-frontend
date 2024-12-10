import React from "react";
import { useForm } from "react-hook-form";
import "./Appointment.css";

const Appointment = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [message, setMessage] = React.useState("");

  const onSubmit = async (data) => {
    try {
      const response = await fetch("https://barbershop-backend-604fa886136d.herokuapp.com/api/appointments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setMessage("Appointment booked successfully!");
      } else {
        setMessage("Error booking appointment.");
      }
    } catch (error) {
      setMessage("Error booking appointment.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="appointment-form-container">
      <div className="header">
        <div className="title">
          <h2>Book Your Appointment</h2>
        </div>
        <div className="description">
          <p>Choose your preferred service and time, and we'll handle the rest!</p>
        </div>
      </div>
      <div className="form-and-image">
        <div className="barbershop-image">
          <img
            src="https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=2074&ixlib=rb-4.0.3"
            alt="Barbershop"
          />
        </div>

        <div className="form-container">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-container">
              <label>Name:</label>
              <input
                type="text"
                {...register("name", { required: "Name is required" })}
                placeholder="Enter your full name"
              />
              {errors.name && <span>{errors.name.message}</span>}
            </div>

            <div className="input-container">
              <label>Pick a Date:</label>
              <input
                type="datetime-local"
                {...register("date", {
                  required: "Date and time are required",
                })}
              />
              {errors.date && <span>{errors.date.message}</span>}
            </div>

            <div className="input-container">
              <label>Service:</label>
              <select
                {...register("service", {
                  required: "Please select a service",
                })}
              >
                <option value="">Select a service</option>
                <option value="Haircut">Haircut</option>
                <option value="Beard Trim">Beard Trim</option>
                <option value="Shave">Shave</option>
                <option value="Facial">Facial</option>
                <option value="Hair Coloring">Hair Coloring</option>
                <option value="Hot Towel Shave">Hot Towel Shave</option>
                <option value="Kids Haircut">Kids Haircut</option>
                <option value="Straight Razor Shave">Straight Razor Shave</option>
                <option value="Styling">Styling</option>
                <option value="Color Touch Up">Color Touch Up</option>
              </select>
              {errors.service && <span>{errors.service.message}</span>}
            </div>

            <button type="submit">Book Appointment</button>
          </form>

          {message && (
            <p className={message.includes("successfully") ? "success" : "error"}>
              {message}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Appointment;
