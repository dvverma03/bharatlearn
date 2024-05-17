import axios from "axios";
import { Alert } from "react-native";

export const getCreatorProfile = async () => {
  const url = `https://www.kroto.in/api/public/${process.env.EXPO_PUBLIC_CREATOR_PROFILE}`;
  try {
    const profile = await axios.get(url);
    return profile?.data;
  } catch (error) {
    console.error("error in get profile", error);
    throw error;
  }
};

export const login = async (email, phone, countryCode) => {
  const url = "https://www.kroto.in/api/auth/client/signin_request";
  const loginData = {
    email,
    phone,
    phoneCountryCode: countryCode,
  };
  try {
    const loginInfo = await axios.post(url, loginData);
    return loginInfo;
  } catch (error) {
    Alert.alert("Phone or Email incorrect");
  }
};

export async function VerifyUser(email, contact, countryCode, otp) {
  try {
    const response = await axios.post(
      `https://www.kroto.in/api/auth/client/verify_signin`,
      {
        email: email,
        phone: contact,
        phoneCountryCode: countryCode,
        otp: otp,
      }
    );
    return response?.data;
  } catch (error) {
    Alert.alert("Error", "Some thing went wrong. Please try again later.");
  }
}

export const getCourses = async (userName) => {
  const url = `https://www.kroto.in/api/public/${userName}/courses`;
  try {
    const courses = await axios.get(url);
    return courses?.data.courses;
  } catch (error) {
    console.log("Error in fetching:", error);
  }
};

export const getEbooks = async (userName) => {
  const url = `https://www.kroto.in/api/public/${userName}/ebooks`;
  try {
    const ebooks = await axios.get(url);
    return ebooks?.data.ebooks;
  } catch (error) {
    console.log("Error in fetching:", error);
  }
};

export const getCourseDetail = async (userName, courseId, accessToken) => {
  const url = `https://www.kroto.in/api/public/${userName}/course/${courseId}`;
  const url2 = `https://www.kroto.in/api/trpc/courseEnrollment/isEnrolled?input={"json":{"courseId":"${courseId}"}}`;

  try {
    const course = await axios.get(url);
    const isEnrolled =
      !!accessToken &&
      (await axios.get(url2, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `PEBearer ${accessToken}`,
        },
      }));

    return {
      ...course?.data,
      isEnrolled: isEnrolled?.data?.result?.data?.json,
    };
  } catch (error) {
    console.log("Error in fetching:", error);
  }
};
export const getEbookDetail = async (userName, ebookId) => {
  const url = `https://www.kroto.in/api/public/${userName}/ebook/${ebookId}`;
  try {
    const course = await axios.get(url);
    return course?.data;
  } catch (error) {
    console.log("Error in fetching:", error);
  }
};

export const getProfile = async (accessToken) => {
  const url = "https://www.kroto.in/api/trpc/creator/getProfile";
  try {
    const profile = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `PEBearer ${accessToken}`,
      },
    });
    return profile?.data.result?.data.json;
  } catch (error) {
    console.error("error in get profile", error);
    throw error;
  }
};

export const editProfile = async (accessToken, bio, name, image) => {
  const url = "https://www.kroto.in/api/trpc/creator/updateDashboardProfile";
  try {
    const response = await axios.post(
      url,
      {
        json: {
          bio: bio,
          name: name,
          image: image,
        },
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `PEBearer ${accessToken}`,
        },
      }
    );
    return response?.data;
  } catch (error) {
    console.error("error in edit profile", error);
    throw error;
  }
};

export const getEnrolledEbooks = async (accessToken) => {
  const url = `https://www.kroto.in/api/trpc/ebookTicket/getSpecificCreatorPurchasedEbooks?input={"json":{"creatorProfile":"${process.env.EXPO_PUBLIC_CREATOR_PROFILE}"}}`;
  try {
    const profile = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `PEBearer ${accessToken}`,
      },
    });
    return profile?.data?.result?.data?.json;
  } catch (error) {
    console.error("error in get profile", error);
    throw error;
  }
};

export const getEnrolledCourses = async (accessToken) => {
  const url = `https://www.kroto.in/api/trpc/courseEnrollment/getSpecificCreatorEnrollments?input={"json":{"creatorProfile":"${process.env.EXPO_PUBLIC_CREATOR_PROFILE}"}}`;
  try {
    const profile = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `PEBearer ${accessToken}`,
      },
    });
    return profile?.data?.result?.data?.json;
  } catch (error) {
    console.error("error in get profile", error);
    throw error;
  }
};

export const getPastLiveClass = async (token) => {
  const url = `https://www.kroto.in/api/trpc/course/pastLiveClass?input={"json":{"creatorProfile":"${process.env.EXPO_PUBLIC_CREATOR_PROFILE}"}}
  `;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `PEBearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data?.result?.data?.json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

export const getUpcomingLiveClass = async (token) => {
  const url = `https://www.kroto.in/api/trpc/course/upcomingLiveClass?input={"json":{"creatorProfile":"${process.env.EXPO_PUBLIC_CREATOR_PROFILE}"}}
  `;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `PEBearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data?.result?.data?.json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

export const getPastWebinars = async (token) => {
  const url = `https://www.kroto.in/api/trpc/event/getSpecificCreatorPastEvent?input={"json":{"creatorProfile":"${process.env.EXPO_PUBLIC_CREATOR_PROFILE}"}}
  `;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `PEBearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data?.result?.data?.json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

export const getUpcomingWebinars = async (token) => {
  const url = `https://www.kroto.in/api/trpc/event/getSpecificCreatorUpcomingEvent?input={"json":{"creatorProfile":"${process.env.EXPO_PUBLIC_CREATOR_PROFILE}"}}
  `;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `PEBearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data?.result?.data?.json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

export const getAllWebinars = async () => {
  const url = `https://www.kroto.in/api/public/${process.env.EXPO_PUBLIC_CREATOR_PROFILE}/webinars`;

  console.log({ url });
  try {
    const response = await axios.get(url);
    console.log({ response });

    return response?.data?.upcomingEvent;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

export const getProgressEnroll = async (id, token) => {
  const url = `https://www.kroto.in/api/trpc/courseProgress/getCourseProgress?input={"json":{"courseId":"${id}"}}
  `;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `PEBearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data?.result?.data?.json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

export const getChapterProgress = async (id, token) => {
  const url = `https://www.kroto.in/api/trpc/courseProgress/getChapterCompleteStatus?input={"json":{"chapterId":"${id}"}}`;

  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `PEBearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response?.data?.result?.data?.json;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};

export const updateChapterProgress = async (id, completed, token) => {
  const url =
    "https://www.kroto.in/api/trpc/courseProgress/markChapterComplete";
  try {
    const response = await axios.post(
      url,
      {
        json: {
          chapterId: id,
          completed,
        },
      },
      {
        headers: {
          Authorization: `PEBearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data?.result?.data?.json;
  } catch (error) {
    console.error("error in update chapter progress", error);
    throw error;
  }
};

export const updateLastChapterWatched = async (courseId, id, token) => {
  const url =
    "https://www.kroto.in/api/trpc/courseProgress/updateLastChapterWatched";
  try {
    const response = await axios.post(
      url,
      {
        json: {
          chapterId: id,
          courseId,
        },
      },
      {
        headers: {
          Authorization: `PEBearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response?.data?.result?.data?.json;
  } catch (error) {
    console.error("error in update chapter progress", error);
    throw error;
  }
};

export const getWebinarDetails = async (id) => {
  const url = `https://www.kroto.in/api/public/saurabh/webinar/${id}`;

  try {
    const response = await axios.get(url);
    return response?.data;
  } catch (err) {
    console.error("Error:", err);
    return null;
  }
};
