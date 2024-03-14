import axios from "axios";

// const base_url = "http://192.168.1.19:5000/api";
const base_url = "https://multipoint.adfames.com/api";
// const base_url = "http://localhost:3000/api";
const headers = { "Content-Type": "application/json" };

export const RegisterReq = async (firstName, lastName, email, password) => {
  try {
    const response = await axios.post(
      `${base_url}/register`,
      {
        firstName,
        lastName,
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};

export async function LoginReq(email, password) {
  try {
    const response = await axios.post(
      `${base_url}/login`,
      {
        email,
        password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
}

export const CreateNewInspection = async (inspectionData) => {
  let data = JSON.stringify(inspectionData);

  let config = {
    method: "post",
    url: `${base_url}/inspection/details`,
    headers: headers,
    data: data,
  };

  return await axios.request(config);
};
export const getInspectionByUserIdReq = async (userId) => {
  try {
    const response = await axios.get(
      `${base_url}/inspection/details/${userId}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return error.message;
  }
};
export const deleteInspectionReq = async (inspectionId) => {
  try {
    const response = await axios.delete(
      `${base_url}/inspection/${inspectionId}`
    );
    if (response.status === 200) {
      return response.data;
    } else {
      return null;
    }
  } catch (error) {
    return error.message;
  }
};
export const getInspectionReq = async (inspectionId) => {
  try {
    const response = await axios.get(`${base_url}/property/${inspectionId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateDeatilsReq = async (inspectionId, updatedDeatils) => {
  let data = JSON.stringify(updatedDeatils);
  try {
    const response = await axios.put(
      `${base_url}/inspection/details/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateInvoiceReq = async (inspectionId, invoiceData) => {
  let data = JSON.stringify(invoiceData);

  try {
    const response = await axios.put(
      `${base_url}/inspection/invoice/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateSummaryReq = async (inspectionId, sumData) => {
  let data = JSON.stringify(sumData);

  try {
    const response = await axios.put(
      `${base_url}/inspection/summary/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateOverviewReq = async (inspectionId, sumData) => {
  let data = JSON.stringify(sumData);

  try {
    const response = await axios.put(
      `${base_url}/inspection/overview/${inspectionId}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const getAllInspectionReq = async (inspectionId) => {
  try {
    const response = await axios.get(`${base_url}/inspection/${inspectionId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const getUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${base_url}/user/${userId}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const updateProfileReq = async (userId, profileData) => {
  try {
    const response = await axios.put(
      `${base_url}/user/${userId}`,
      profileData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    return response.data;
  } catch (error) {
    return error.message;
  }
};
export const createEventsReq = async (userId, eventsData) => {
  try {
    const res = await axios.put(`${base_url}/events/${userId}`, eventsData, {
      headers: headers,
    });
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const getEventsReq = async (userId) => {
  try {
    const res = await axios.get(`${base_url}/events/${userId}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const deleteEventsReq = async (userId, eventId) => {
  try {
    const res = await axios.delete(`${base_url}/events/${userId}/${eventId}`);
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const updateEventReq = async (userId, eventId, updatedData) => {
  try {
    const res = await axios.put(
      `${base_url}/events/${userId}/${eventId}`,
      updatedData,
      {
        headers: headers,
      }
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const updateGroundReq = async (
  inspectionId,
  groundId,
  reqData,
  property,
  photos
) => {
  const formData = new FormData();
  if (property) {
    const data = reqData[property];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (Array.isArray(data[key])) {
          data[key].forEach((value, index) => {
            formData.append(`${property}[${key}][${index}]`, value);
          });
        } else {
          formData.append(`${property}[${key}]`, data[key]);
        }
      }
    }
    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }
  } else {
    formData.append("photos", [])
  }
  try {
    if (groundId) {
      const res = await axios.put(
        `${base_url}/inspection/${inspectionId}/grounds/${groundId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${base_url}/inspection/${inspectionId}/grounds`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    }
  } catch (error) {
    return error.message;
  }
};
export const updateRoofReq = async (
  inspectionId,
  roofId,
  reqData,
  property,
  photos
) => {
  const formData = new FormData();
  if (property) {
    const data = reqData[property];
    for (let key in data) {
      if (data.hasOwnProperty(key)) {
        if (Array.isArray(data[key])) {
          data[key].forEach((value, index) => {
            formData.append(`${property}[${key}][${index}]`, value);
          });
        } else {
          formData.append(`${property}[${key}]`, data[key]);
        }
      }
    }
    for (let i = 0; i < photos.length; i++) {
      formData.append("photos", photos[i]);
    }
  } else {
    formData.append("photos", [])
  }
  try {
    if (roofId) {
      const res = await axios.put(
        `${base_url}/inspection/${inspectionId}/roof/${roofId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    } else {
      const res = await axios.put(
        `${base_url}/inspection/${inspectionId}/roof`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return res.data;
    }
  } catch (error) {
    return error.message;
  }
};
export const deleteGroundReq = async (inspectionId, groundId) => {
  try {
    const res = await axios.delete(
      `${base_url}/inspection/${inspectionId}/grounds/${groundId}`
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export const deleteRoofReq = async (inspectionId, roofId) => {
  try {
    const res = await axios.delete(
      `${base_url}/inspection/${inspectionId}/roof/${roofId}`
    );
    return res.data;
  } catch (error) {
    return error.message;
  }
};
export { base_url };
