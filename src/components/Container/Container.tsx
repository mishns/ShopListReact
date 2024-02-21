import React from "react";
import styles from "./container.css";

interface ContainerProps {
  children?: React.ReactNode;
}

export function Container({ children }: Readonly<ContainerProps>) {
  return <div className={styles.container}>{children}</div>;
}
