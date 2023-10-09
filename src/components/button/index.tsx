import React, { useState } from "react";
import "./index.scss";

interface ButtonProps {
  id?: string;
  color?:
    | string
    | "primary"
    | "destroy"
    | "success"
    | "warning"
    | "transparent"
    | "link"
    | "draft"
    | "grey"
    | "white"
    | "nomal"
    | "primaryOpacity"
    | "mix-white";

  variant?: string | "outline";
  children?: any;
  disabled?: boolean;
  onClick?: any;
  type?: "submit" | "button";
  className?: string;
  onlyIcon?: boolean;
  size?: "slim" | "large";
  refButton?: any;
  onDrop?: any;
  onDragOver?: any;
  onDragLeave?: any;
  onDragEnter?: any;
  isLoading?: boolean;
  style?: {
    type: "normal" | "mask";
    icon: any;
  };
  rest?: React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >;
}
export default function Button(props: ButtonProps) {
  const {
    id,
    color,
    variant,
    children,
    disabled,
    onClick,
    type,
    className,
    onlyIcon,
    size,
    refButton,
    onDrop,
    onDragEnter,
    onDragLeave,
    onDragOver,
    isLoading,
    style,
    ...rest
  } = props;

  return (
    <button
      id={id}
      type={type}
      onClick={onClick}
      disabled={disabled || isLoading}
      ref={refButton ?? null}
      className={`foodlist-button${
        color ? ` foodlist-button--color-${color}` : ""
      }${
        variant && (!color || color !== "transparent")
          ? ` foodlist-button--variant-${variant}`
          : ""
      }${onlyIcon ? " foodlist-button__only-icon" : ""}${
        size ? ` foodlist-button__size-${size}` : ""
      }${className ? ` ${className}` : ""} ${isLoading && "loading"} ${
        style?.type == "mask" ? "btn-mask" : ""
      } `}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDragOver={onDragOver}
      onDrop={onDrop}
      {...rest}
    >
      <div>{children}</div>
      {/* {style && (
        <div className="mask">
          <Icon name={style?.icon} />
        </div>
      )} */}
    </button>
  );
}
