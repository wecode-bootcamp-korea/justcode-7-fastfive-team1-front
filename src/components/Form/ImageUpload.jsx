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
      {fileImage && (
        <div className={css.test}>
          <img className={css.preview} src={fileImage} alt={alt} />
          <img
            className={css.cancelImg}
            src="image/cancelFile.png"
            alt="companyProfile cancel"
            onClick={deleteFileImage}
            id="file1"
          />
        </div>
      )}
      {fileName && (
        <div className={css.document}>
          <span>{fileName}</span>
          <img
            src="image/cancelFile.png"
            alt="companyProfile cancel"
            onClick={deleteFileImage}
            id="file2"
          />
        </div>
      )}
      <h5>{desc}</h5>
    </div>
  );
}

export default imageUpload;
