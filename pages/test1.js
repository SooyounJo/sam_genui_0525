import { useEffect } from "react";
import MlpTestPage from "../components/prototype/MlpTestPage";

export default function Test1Page() {
  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    if (window.__mlpTestConfig) {
      window.__mlpTestConfig.test1RevealAll = false;
    }

    var tries = 0;
    var timer = setInterval(function () {
      tries += 1;
      var canvas = document.getElementById("canvas");
      if (canvas && canvas.getAttribute("data-test-scope") === "test1") {
        canvas.removeAttribute("data-test1-reveal-all");
        canvas.removeAttribute("data-test1-intro-run");
        canvas.removeAttribute("data-test1-pill-prep");
        canvas.removeAttribute("data-test1-pill-run");
        if (typeof window.__armTest1IntroDelay === "function") {
          window.__armTest1IntroDelay(canvas);
        }
        clearInterval(timer);
      }
      if (tries > 60) clearInterval(timer);
    }, 100);

    return function () {
      clearInterval(timer);
      if (typeof window.__clearTest1IntroTimer === "function") {
        window.__clearTest1IntroTimer();
      } else if (window.__mlpTest1IntroTimer) {
        clearTimeout(window.__mlpTest1IntroTimer);
        window.__mlpTest1IntroTimer = null;
      }
    };
  }, []);

  return (
    <MlpTestPage
      testId="test1"
      title="MLP Test 1 - Persona 1"
      initialSurfaceType="tab-root"
    />
  );
}
