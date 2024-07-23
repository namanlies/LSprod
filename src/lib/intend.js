export default function getIntend(host) {
  let intend_android_before,
    intend_android_after,
    intend_ios_before,
    intend_ios_after;

  if (host === "youtube") {
    intend_android_before = "intent://";
    intend_android_after =
      "/#Intent;package=com.google.android.youtube;scheme=https;end";
    intend_ios_before = "vnd.youtube://";
    intend_ios_after = "/";
  } else if (host === "instagram") {
    intend_android_before = "intent://";
    intend_android_after =
      "#Intent;package=com.instagram.android;scheme=https;end";
    intend_ios_before = "instagram://user username=";
    intend_ios_after = "/";
  } else if (host === "amazon") {
    intend_android_before = "com.amazon.mobile.shopping.web://";
    intend_android_after = "/";
    intend_ios_before = "com.amazon.mobile.shopping.web://";
    intend_ios_after = "/";
  } else {
    intend_android_before = "";
    intend_android_after = "";
    intend_ios_before = "";
    intend_ios_after = "";
  }

  return {
    intend_android_before,
    intend_android_after,
    intend_ios_before,
    intend_ios_after,
  };
}
