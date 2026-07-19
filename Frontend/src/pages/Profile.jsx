import { Camera, Mail, User } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import AuthLayout from "../components/layout/AuthLayout";
import Logo from "../components/Logo";
import Card from "../components/ui/Card";
import { useAuth } from "../context/AuthContext";
import { updateProfile } from "../services/authApi";

function Profile() {
  const { user, setUser } = useAuth();

  const [editMode, setEditMode] = useState(false);

  const [formData, setFormData] = useState({
    name: user?.name || "",
    dob: user?.dob || "",
    address: user?.address || "",
  });

  const [image, setImage] = useState(null);

  const [preview, setPreview] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  const handleUpdate = async () => {
    try {
      const data = new FormData();

      data.append("name", formData.name);

      data.append("dob", formData.dob);

      data.append("address", formData.address);

      if (image) {
        data.append("profileImage", image);
      }

      const res = await updateProfile(data);

      setUser(res.data.user);

      toast.success("Profile updated");

      setEditMode(false);
    } catch (error) {
      toast.error(error.response?.data?.message || "Update failed");
    }
  };

  return (
    <>
      <AuthLayout>
        <Logo></Logo>
        <Card>
          <div className="text-center">
            <div className="relative mx-auto w-24 h-24">
              {preview || user?.profileImage ? (
                <img
                  src={preview || `http://localhost:3000${user.profileImage}`}
                  className="
w-24
h-24
rounded-full
object-cover
shadow-lg
"
                />
              ) : (
                <div
                  className="
w-24
h-24
rounded-full
bg-teal-500
text-white
flex
items-center
justify-center
text-4xl
font-bold
shadow-lg
"
                >
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              )}

              {editMode && (
                <label
                  className="
absolute
bottom-0
right-0
bg-white
p-2
rounded-full
cursor-pointer
shadow
"
                >
                  <Camera size={18} className="text-teal-500" />

                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              )}
            </div>

            <h1
              className="
mt-5
text-3xl
font-bold
text-gray-800
"
            >
              {user?.name}
            </h1>

            <p className="text-gray-500 mt-2">{user?.email}</p>

            <hr className="my-6" />

            <div className="space-y-5 text-left">
              <div className="flex items-center gap-4">
                <div
                  className="
                            w-10
                            h-10
                            rounded-full
                          bg-teal-50
                            flex
                            items-center
                            justify-center
                          "
                >
                  <User size={22} className="text-teal-500" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Full Name</p>

                  {editMode ? (
                    <input
                      className="
                                border
                                rounded
                                px-3
                                py-2
                              "
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                    />
                  ) : (
                    <p className="font-semibold">{user?.name}</p>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div
                  className="
w-10
h-10
rounded-full
bg-teal-50
flex
items-center
justify-center
"
                >
                  <Mail size={22} className="text-teal-500" />
                </div>

                <div>
                  <p className="text-gray-500 text-sm">Email</p>

                  <p className="font-semibold">{user?.email}</p>
                </div>
              </div>

              {editMode && (
                <>
                  <input
                    type="date"
                    className="
                              border
                              rounded
                              px-3
                              py-2
                              w-full
                            "
                    value={formData.dob}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        dob: e.target.value,
                      })
                    }
                  />

                  <textarea
                    className="
                              border
                              rounded
                              px-3
                              py-2
                              w-full
                            "
                    placeholder="Address"
                    value={formData.address}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        address: e.target.value,
                      })
                    }
                  />
                </>
              )}
            </div>

            {editMode ? (
              <button
                onClick={handleUpdate}
                className="
                          mt-6
                          w-full
                        bg-teal-500
                        text-white
                          py-3
                          rounded-lg
                          font-semibold
                        hover:bg-teal-600
                          "
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setEditMode(true)}
                className="
                          mt-6
                          w-full
                        bg-teal-500
                        text-white
                          py-3
                          rounded-lg
                          font-semibold
                        hover:bg-teal-600
                        "
              >
                Edit Profile
              </button>
            )}
          </div>
        </Card>
      </AuthLayout>
    </>
  );
}

export default Profile;
