import { useState } from "react";
import { Buffer } from "buffer";
import axios from "axios";

export function useAvatar() {
  /*  */
  const avatarApi = process.env.REACT_APP_AVATAR_API;
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function fetchAvatar() {
    const data = [];

    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${avatarApi}/${Math.round(Math.random() * 1000)}`
      );
      const buffer = new Buffer(image.data);

      data.push(buffer.toString("base64"));
    }

    setAvatars(data);
    setIsLoading(false);
  }

  return { avatars, setAvatars, isLoading, setIsLoading, fetchAvatar };
}
