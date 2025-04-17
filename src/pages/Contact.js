import React, { useState, useEffect } from "react";
import Layout from "../components/Layout/Layout";
import { doc, getDoc, addDoc, collection } from "firebase/firestore";
import { db } from "../firebase.config";
import { useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAuth } from "firebase/auth";
import "../styles/contact.css";

const Contact = () => {
  const [message, setMessage] = useState("");
  const [landlord, setLandlord] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const params = useParams();
  const auth = getAuth();

  useEffect(() => {
    const getLandlord = async () => {
      try {
        const docRef = doc(db, "users", params.landlordId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setLandlord(docSnap.data());
        } else {
          toast.error("Unable to fetch landlord data");
        }
      } catch (error) {
        console.error("Error fetching landlord:", error);
        toast.error("Error fetching landlord details");
      }
    };
    getLandlord();
  }, [params.landlordId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!message.trim()) {
      toast.error("Please enter a message");
      return;
    }

    if (!landlord?.email) {
      toast.error("Landlord email not available");
      return;
    }

    if (!auth.currentUser) {
      toast.error("You must be logged in to send messages");
      return;
    }

    setLoading(true);
    try {
      // Create a new message document in Firestore
      const messageData = {
        to: landlord.email,
        toUserId: params.landlordId,
        fromUserId: auth.currentUser.uid,
        fromEmail: auth.currentUser.email,
        fromName: auth.currentUser.displayName || "Anonymous User",
        message: message,
        listingName: searchParams.get("listingName"),
        createdAt: new Date().toISOString(),
        read: false
      };

      // Add the message to Firestore
      await addDoc(collection(db, "messages"), messageData);

      toast.success("Message sent successfully!");
      setMessage("");
    } catch (error) {
      console.error("Error sending message:", error);
      toast.error("Failed to send message. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout title="contact details - house marketplace">
      <div className="row contact-container">
        <div className="col-md-6 contact-container-col-1">
          <img src="/assets/contact.svg" alt="contact" />
        </div>
        <div className="col-md-6 contact-container-col-2">
          <h1>Contact Details</h1>
          <div>
            {landlord !== "" && (
              <main>
                <h3 className="mb-4">
                  Person Name :{" "}
                  <span style={{ color: "#470d21" }}>
                    {" "}
                    " {landlord?.name} "{" "}
                  </span>
                </h3>

                <form onSubmit={handleSubmit}>
                  <div className="form-floating">
                    <textarea
                      className="form-control"
                      placeholder="Leave a comment here"
                      value={message}
                      id="message"
                      onChange={(e) => setMessage(e.target.value)}
                      required
                      disabled={loading}
                    />
                    <label
                      htmlFor="floatingTextarea"
                      style={{ color: "lightgray" }}
                    >
                      Type your message here
                    </label>
                  </div>
                  <button 
                    type="submit" 
                    className="btn mt-2"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send Message"}
                  </button>
                </form>
              </main>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
