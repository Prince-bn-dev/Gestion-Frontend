export function FormButton(props) {
  const { text, isValid, isSubmitting } = props;
  return (
    <div className="formButton">
      <button
        className="btn"
        disabled={isValid ? (isSubmitting ? true : false) : true}
        type="submit"
      >
        {isSubmitting ? "...." : text}
      </button>
    </div>
  );
}

export function BackgroundButton(props) {
  const { text,icon, isLink, link, ...rest } = props;

  if (isLink) {
    return (
      <a className="btn backgroundButton" href={link} {...rest}>
       {icon} {text}{" "}
      </a>
    );
  }
  return (
    <button className="btn backgroundButton" {...rest}>
      {icon}{text}{" "}
    </button>
  );
}

export function BorderButton(props) {
  const { text, isLink,icon, link, ...rest } = props;

  if (isLink) {
    return (
      <a className="btn borderButton" href={link} {...rest}>
        {icon}{text}{" "}
      </a>
    );
  }
  return (
    <button className="btn borderButton" {...rest}>
      {icon}{text}{" "}
    </button>
  );
}