import React from "react";
import { Path, Rect, Svg } from "react-native-svg";

const ActiveCommunityIcon = ({ props }) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={120}
      height={36}
      fill="none"
      {...props}
    >
      <Rect width={122} height={36} x={0.5} fill="#22C55D" rx={18} />
      <Path
        stroke="#fff"
        strokeWidth={1.5}
        d="M21.5 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M27.5 15a3 3 0 0 0 0-6"
      />
      <Path
        stroke="#fff"
        strokeWidth={1.5}
        d="M21.5 27c3.866 0 7-1.79 7-4s-3.134-4-7-4-7 1.79-7 4 3.134 4 7 4Z"
      />
      <Path
        stroke="#fff"
        strokeLinecap="round"
        strokeWidth={1.5}
        d="M30.5 20c1.754.385 3 1.359 3 2.5 0 1.03-1.014 1.923-2.5 2.37"
      />
      <Path
        fill="#fff"
        d="M52.707 16.61h-1.33a2.032 2.032 0 0 0-.796-1.299 2.202 2.202 0 0 0-.678-.34 2.645 2.645 0 0 0-.788-.116c-.503 0-.953.127-1.35.38-.396.252-.708.623-.938 1.112-.228.488-.341 1.085-.341 1.79 0 .71.113 1.309.34 1.798.23.488.545.858.943 1.108.397.25.845.375 1.342.375.275 0 .537-.037.784-.111.25-.077.476-.19.677-.337a2.038 2.038 0 0 0 .805-1.283l1.33.005a3.559 3.559 0 0 1-.413 1.184 3.269 3.269 0 0 1-.78.93 3.525 3.525 0 0 1-1.082.6c-.406.142-.85.213-1.33.213-.755 0-1.429-.179-2.02-.537-.59-.36-1.056-.876-1.397-1.547-.338-.67-.507-1.47-.507-2.399 0-.931.17-1.731.51-2.399.342-.67.808-1.184 1.399-1.542.59-.361 1.262-.542 2.015-.542.463 0 .895.067 1.296.2.403.131.765.325 1.086.58.321.253.587.563.797.93.21.363.352.779.426 1.248Zm4.23 6.022c-.613 0-1.148-.14-1.606-.422a2.844 2.844 0 0 1-1.065-1.18c-.253-.506-.38-1.097-.38-1.773 0-.679.127-1.273.38-1.781a2.838 2.838 0 0 1 1.065-1.185c.458-.281.993-.422 1.607-.422.613 0 1.149.14 1.606.422.458.281.813.676 1.066 1.185.253.508.379 1.102.379 1.781 0 .676-.126 1.267-.38 1.773-.252.505-.607.899-1.065 1.18-.457.281-.992.422-1.606.422Zm.005-1.07c.398 0 .727-.105.989-.315.261-.21.454-.49.58-.84a3.34 3.34 0 0 0 .191-1.154c0-.418-.064-.801-.192-1.15a1.874 1.874 0 0 0-.58-.849c-.26-.213-.59-.32-.988-.32-.4 0-.733.107-.997.32a1.903 1.903 0 0 0-.584.848c-.125.35-.187.733-.187 1.15 0 .421.062.806.187 1.156.128.35.323.629.584.84.264.21.596.314.997.314Zm4.47.938v-6.546h1.222v1.066h.081c.137-.36.36-.642.67-.844.309-.204.68-.307 1.111-.307.438 0 .804.103 1.1.307a1.8 1.8 0 0 1 .66.844h.069c.156-.35.404-.628.745-.835.341-.21.748-.316 1.22-.316.593 0 1.077.186 1.452.559.378.372.567.933.567 1.683V22.5h-1.274v-4.27c0-.443-.12-.764-.362-.963a1.318 1.318 0 0 0-.865-.298c-.415 0-.738.128-.968.383-.23.253-.345.578-.345.976V22.5h-1.27v-4.35c0-.356-.11-.641-.332-.857-.222-.216-.51-.324-.865-.324-.242 0-.465.064-.67.191-.201.125-.364.3-.49.525a1.605 1.605 0 0 0-.183.78V22.5h-1.274Zm10.605 0v-6.546h1.223v1.066h.08c.137-.36.36-.642.67-.844.31-.204.68-.307 1.112-.307.437 0 .804.103 1.1.307a1.8 1.8 0 0 1 .66.844h.068c.156-.35.405-.628.746-.835.34-.21.747-.316 1.218-.316.594 0 1.079.186 1.454.559.377.372.566.933.566 1.683V22.5H79.64v-4.27c0-.443-.12-.764-.362-.963a1.318 1.318 0 0 0-.865-.298c-.415 0-.737.128-.967.383-.23.253-.346.578-.346.976V22.5h-1.27v-4.35c0-.356-.11-.641-.332-.857-.221-.216-.51-.324-.865-.324-.241 0-.464.064-.669.191-.202.125-.365.3-.49.525a1.605 1.605 0 0 0-.183.78V22.5h-1.274Zm14.752-2.715v-3.83h1.278V22.5h-1.253v-1.134h-.068c-.15.35-.392.641-.725.874-.33.23-.74.345-1.231.345-.42 0-.793-.092-1.117-.277a1.946 1.946 0 0 1-.758-.83c-.182-.367-.273-.82-.273-1.36v-4.163h1.274v4.01c0 .445.124.8.371 1.065.247.264.568.396.963.396.239 0 .476-.06.712-.179a1.5 1.5 0 0 0 .592-.541c.16-.241.237-.548.234-.92Zm4.264-1.171V22.5h-1.274v-6.546h1.223v1.066h.08a1.87 1.87 0 0 1 .708-.835c.324-.21.732-.316 1.223-.316.446 0 .837.094 1.172.282.335.184.595.46.78.826.185.367.277.82.277 1.36V22.5h-1.274v-4.01c0-.474-.124-.845-.37-1.112-.248-.27-.588-.405-1.02-.405-.295 0-.558.064-.788.192a1.38 1.38 0 0 0-.541.562c-.13.245-.196.54-.196.887Zm5.898 3.886v-6.546h1.274V22.5H96.93Zm.643-7.555a.81.81 0 0 1-.57-.222.72.72 0 0 1-.235-.537c0-.21.078-.39.234-.537.16-.15.35-.226.571-.226.222 0 .41.076.567.226.16.148.239.327.239.537 0 .207-.08.386-.239.537a.795.795 0 0 1-.567.222Zm5.4 1.01v1.022h-3.575v-1.023h3.575Zm-2.616-1.569h1.274v6.192c0 .247.037.433.111.558a.58.58 0 0 0 .285.252c.12.042.249.064.388.064.102 0 .192-.007.269-.022l.179-.034.23 1.053a2.138 2.138 0 0 1-.316.085 2.486 2.486 0 0 1-.511.051 2.24 2.24 0 0 1-.937-.179 1.609 1.609 0 0 1-.704-.58c-.179-.26-.268-.589-.268-.984v-6.456Zm4.831 10.569c-.19 0-.363-.016-.52-.047a1.639 1.639 0 0 1-.349-.094l.307-1.044c.233.062.44.09.622.08a.743.743 0 0 0 .481-.204c.143-.128.268-.336.375-.626l.158-.435-2.395-6.63h1.364l1.658 5.08h.068l1.657-5.08h1.368l-2.697 7.419c-.125.34-.284.629-.477.865a1.861 1.861 0 0 1-.691.537c-.267.119-.576.178-.929.178Z"
      />
    </Svg>
  );
};

export default ActiveCommunityIcon;
