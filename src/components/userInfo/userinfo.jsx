import { useState, useEffect } from "react";
import "./userinfo.css";
import Cookies from "js-cookie";

function UserInfo() {
  const [formData, setFormData] = useState({
    id: null,
    fullname: "",
    contact: "",
    door: "",
    street: "",
    city: "",
    zip: "",
    district: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("http://localhost:8000/api/addressget/", {
          method: "GET",
          headers: {
            "X-CSRFToken": Cookies.get("csrftoken"),
          },
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();

        if (data[0]) {
          setFormData({
            id: data[0].id,
            fullname: data[0].fullname,
            contact: data[0].contact,
            door: data[0].door,
            street: data[0].street,
            city: data[0].city,
            zip: data[0].zipcode,
            district: data[0].district,
          });
        } else {
          setFormData({
            id: null,
            fullname: "",
            contact: "",
            door: "",
            street: "",
            city: "",
            zip: "",
            district: "",
          });
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = async () => {
      const options = {
        method: formData.id ? "PUT" : "POST",
        headers: {
          "Content-type": "application/json",
          "X-CSRFToken": Cookies.get("csrftoken"),
        },
        credentials: "include",
        body: JSON.stringify({
          fullname: formData.fullname,
          contact: formData.contact,
          door: formData.door,
          street: formData.street,
          city: formData.city,
          zipcode: formData.zip,
          district: formData.district,
        }),
      };
      try {
        const response = await fetch(
          "http://localhost:8000/api/addressget/",
          options
        );
        const data = await response.json();
        if (response.ok) {
          console.log("response ok");
        } else {
          console.log("Response not OK:", data);
        }
      } catch (error) {
        console.error("An error occurred:", error);
      }
    };
    submitData();
    window.location.reload();
  };

  return (
    <>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <section className="addr-sec">
          <h1>Change User Information here</h1>
          <div>
            <form onSubmit={(e) => handleSubmit(e)} className="input-section">
              <div className="inpt-1">
                <div className="inpt">
                  <label htmlFor="fullname">Fullname</label>
                  <input
                    value={formData.fullname}
                    onChange={handleChange}
                    name="fullname"
                    type="text"
                    placeholder="Enter your fullname.."
                  />
                </div>
                <div className="inpt">
                  <label htmlFor="Contact">Contact Number</label>
                  <input
                    name="contact"
                    value={formData.contact}
                    type="text"
                    onChange={handleChange}
                    placeholder="Contact no.."
                  />
                </div>
              </div>
              <div>
                <div className="inpt">
                  <label htmlFor="doorno">Door no/Building Name</label>
                  <input
                    name="door"
                    type="text"
                    placeholder="Door No/Building.."
                    value={formData.door}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="inpt-2">
                <div className="inpt">
                  <label htmlFor="Street">Street</label>
                  <input
                    name="street"
                    type="text"
                    placeholder="Street Address.."
                    value={formData.street}
                    onChange={handleChange}
                  />
                </div>
                <div className="inpt">
                  <label htmlFor="City">City</label>
                  <input
                    name="city"
                    type="text"
                    placeholder="City.."
                    value={formData.city}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="inpt-2">
                <div className="inpt">
                  <label htmlFor="Zip Code">Zip Code</label>
                  <input
                    name="zip"
                    type="text"
                    placeholder="Zip Code.."
                    value={formData.zip}
                    onChange={handleChange}
                  />
                </div>
                <div className="inpt">
                  <label htmlFor="District">District</label>
                  <input
                    name="district"
                    type="text"
                    placeholder="District.."
                    value={formData.district}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="btn-ctn">
                <div className="addrs-btn">
                  <button>Home</button>
                  <button>Work</button>
                  <button>Other</button>
                </div>
                <div>
                  <button type="submit" className="u-button">
                    Update
                  </button>
                </div>
              </div>
            </form>
          </div>
        </section>
      )}
    </>
  );
}

export default UserInfo;
