import axios from "axios";

export const sendOTP = (phone,OTP) => {
    const requestOptions = {
      url: "https://app-server.wati.io/api/v1/sendTemplateMessage?whatsappNumber=91" + phone,
      method: "POST",
      data: {
        template_name: "login_otp",
        broadcast_name: "login_otp",
        parameters: [
          {
            name: "website",
            value: "paperplane_clinic"
          },
          {
            name: "otp",
            value: OTP
          }
        ]
      },
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzZTZjNzU3YS1mZDQ1LTRlYjktODEzYS00MWI1OTljMDI5NjYiLCJ1bmlxdWVfbmFtZSI6InJhamFzcmVlMDcwNDIwMDBAZ21haWwuY29tIiwibmFtZWlkIjoicmFqYXNyZWUwNzA0MjAwMEBnbWFpbC5jb20iLCJlbWFpbCI6InJhamFzcmVlMDcwNDIwMDBAZ21haWwuY29tIiwiYXV0aF90aW1lIjoiMDcvMjIvMjAyMyAxOToyMjoxMyIsImRiX25hbWUiOiJ3YXRpX2FwcF90cmlhbCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IlRSSUFMIiwiZXhwIjoxNjkwNjc1MjAwLCJpc3MiOiJDbGFyZV9BSSIsImF1ZCI6IkNsYXJlX0FJIn0.UlBEkptRBoEE89OXtroGL07Ni-36WDkTU6yBD5MQ8EM"
      }
    };

    return axios(requestOptions).then(response => {
        if (response.status === 200) {
          return response.data;
        } else {
          throw new Error(response.error);
        }
      });
}