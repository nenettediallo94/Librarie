import React from "react";

export default function FileUploadZone({ label, accept, onFileChange, preview }) {
  return (
    <div className="file-upload-zone">
      <label>{label}</label>
      <input type="file" accept={accept} onChange={onFileChange} />
      {preview && <img src={preview} alt="Preview" className="preview" />}
    </div>
  );
}
