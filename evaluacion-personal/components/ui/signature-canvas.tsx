"use client";

import { useRef, useState, useEffect } from "react";
import SignaturePad from "react-signature-canvas"; // Cambiado el nombre de la importación
import { Button } from "@/components/ui/button";

interface SignatureCanvasProps {
  onSave: (signature: string | null) => void;
  signature: string | null;
}

export function SignatureCanvas({ onSave, signature }: SignatureCanvasProps) {
  const sigCanvas = useRef<SignaturePad>(null); // Actualizado el tipo aquí también
  const [isEmpty, setIsEmpty] = useState(true);

  useEffect(() => {
    if (signature && sigCanvas.current) {
      // Si hay una firma guardada, la cargamos en el canvas
      const ctx = sigCanvas.current.getCanvas().getContext("2d");
      if (ctx) {
        const img = new Image();
        img.onload = () => {
          ctx.drawImage(img, 0, 0);
          setIsEmpty(false);
        };
        img.src = signature;
      }
    }
  }, [signature]);

  const clear = () => {
    sigCanvas.current?.clear();
    setIsEmpty(true);
    onSave(null);
  };

  const save = () => {
    if (sigCanvas.current && !sigCanvas.current.isEmpty()) {
      const dataURL = sigCanvas.current.toDataURL("image/png");
      onSave(dataURL);
      setIsEmpty(false);
    } else {
      alert("Por favor firme antes de guardar");
    }
  };

  const handleBegin = () => {
    setIsEmpty(false);
  };

  return (
    <div className="space-y-2">
      <div className="border border-gray-300 rounded-md bg-gray-50">
        <SignaturePad
          ref={sigCanvas}
          penColor="black"
          canvasProps={{
            width: 500,
            height: 150,
            className: "w-full h-[150px] cursor-crosshair"
          }}
          onBegin={handleBegin}
        />
      </div>
      <div className="flex space-x-2">
        <Button 
          type="button" 
          variant="outline" 
          onClick={clear}
          className="flex-1"
        >
          Limpiar
        </Button>
        <Button 
          type="button" 
          onClick={save}
          className="flex-1"
          disabled={isEmpty}
        >
          Guardar Firma
        </Button>
      </div>
    </div>
  );
}