import { useState } from "react";
import { createPortal } from "react-dom";
import Cropper from "react-easy-crop";
import { getCroppedImg } from "../utils/imageUtils";

export default function CropModal({ image, aspectOptions = [1], onClose, onSave }) {

    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);

    // индекс на текущото aspect ratio
    const [aspectIndex, setAspectIndex] = useState(0);
    const aspect = aspectOptions[aspectIndex].value;
    const aspectLabel = aspectOptions[aspectIndex].label;

    const handleCropComplete = (_, areaPixels) => {
        setCroppedAreaPixels(areaPixels);
    };

    const handleSave = async () => {
        if (!croppedAreaPixels) return;
        try {
            const dataUrl = await getCroppedImg(image, croppedAreaPixels, aspect);
            onSave(dataUrl);
        } catch (e) {
            console.error("Crop error:", e);
        }
    };

    // превключване между aspect ratios
    const handleChangeAspect = () => {
        if (aspectOptions.length > 1) {
            setAspectIndex((prev) => (prev + 1) % aspectOptions.length);
        }
    };

    return createPortal(
        <div className="fixed inset-0 z-[9999] bg-black/70 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-xl w-[480px] max-w-[90vw]">
                <div className="relative w-full h-[360px]">
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={handleCropComplete}
                    />
                </div>

                <div className="flex justify-between gap-2 p-4 border-t">
                    <button
                        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    {aspectOptions.length > 1 && aspectOptions.some(opt => opt.value !== 1) && (
                        <button
                            onClick={handleChangeAspect}
                            className="px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        >
                            Change Aspect
                        </button>
                    )}

                    <button
                        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                        onClick={handleSave}
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>,
        document.body
    );
}
