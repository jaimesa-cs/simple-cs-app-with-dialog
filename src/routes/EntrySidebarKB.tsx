import Icon from '../images/sidebarwidget.svg';
import { useEffect, useRef, useState } from "react";
import ContentstackAppSDK from "@contentstack/app-sdk";
import { Button, ButtonGroup, cbModal, ModalBody, ModalFooter, ModalHeader } from "@contentstack/venus-components";
import "@contentstack/venus-components/build/main.css";

function EntrySidebarExtension() {

  const [size, setSize] = useState("");


  useEffect(() => {
    ContentstackAppSDK.init().then(async (sdk) => {
      var sidebarWidget = await sdk.location.SidebarWidget;
      var entry = await sidebarWidget?.entry.getData();
      console.log(entry);
      const size = new TextEncoder().encode(JSON.stringify(entry)).length
      const kiloBytes = size / 1024;
      setSize(Number.parseFloat(kiloBytes.toString()).toFixed(2));
    })
  }, []);


  return (
    <div>
      Estimated Entry Size (Minus headers, compression, etc): {size} KB
    </div>
  );
};

export default EntrySidebarExtension;
