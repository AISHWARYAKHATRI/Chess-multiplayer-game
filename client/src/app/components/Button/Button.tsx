import React, { forwardRef } from "react";
import classNames from "classnames";
import { ButtonProps, Options } from "./types";
import styles from "./style.module.css";

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, size, variant, className, ...rest }, ref) => {
    return (
      <button
        ref={ref}
        className={classNames(
          styles.button,
          styles.primary,
          {
            [styles.secondary]: variant === Options.Variant.Secondary,
          },
          className
        )}
        {...rest}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

const LinedButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={classNames(styles.lined, className)}
      {...props}
    />
  )
);

LinedButton.displayName = "LinedButton";

const PlainButton = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, ...props }, ref) => (
    <Button
      ref={ref}
      className={classNames(styles.plain, className)}
      {...props}
    />
  )
);

PlainButton.displayName = "PlainButton";

const _Button = Object.assign(Button, {
  Sizes: Options.Size,
  Shapes: Options.Shape,
  Variants: Options.Variant,
  Lined: LinedButton,
  Plain: PlainButton,
});

export default _Button;
