import css from './ImageUpload.module.scss';
function imageUpload({
  title,
  required,
  desc,
  accept,
  onChange,
  fileImage,
  alt,
  forId,
  fileName,
  deleteFileImage,
}) {
  return (
    <div className={css.container}>
      <h2>{title} </h2>
      <label htmlFor={forId}>파일 첨부하기</label>
      <input
        type="file"
        id={forId}
        accept={accept}
        onChange={onChange}
        required={required}
      />
      {fileImage && <img src={fileImage} alt={alt} />}
      {fileName && (
        <div className={css.document}>
          <span>{fileName}</span>
          <img src="image/cancel.png" alt="companyProfile cancel" />
        </div>
      )}
      <h5>{desc}</h5>
    </div>
  );
}

export default imageUpload;
