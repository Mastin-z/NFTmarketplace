import classNames from "classnames";
import { useField } from "formik";
import { TextareaHTMLAttributes } from "react";

type TraitProps = {
  name: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

const Trait1 = (props: TraitProps) => {
  const [, { error, value }, { setValue }] = useField(props.name);

  return (
    <textarea
      className={classNames("flex-grow resize-none rounded border px-2 py-1", {
        "border-gray-300": !error,
        "border-red-500": error,
      })}
      placeholder="trait1"
      value={value}
      onChange={(e) => {
        // 使用正则表达式过滤非数字字符
        const numericValue1 = e.target.value.replace(/[^.\d]/g, "");
        setValue(numericValue1);
      }}
      inputMode="numeric" // 限制输入为数字
      style={{ width: '62px', height: '25px' }}
      {...props}
    />
  );
};

export default Trait1;
