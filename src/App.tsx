import * as React from "react";
import { hot } from "react-hot-loader/root";
import { Container } from "./components/Container";
import { ShopList } from "@components/ShopList";
import styles from "./app.css";

function App() {
  return (
    <div className={styles.app}>
      <Container>
        <div className={styles.content}>
          <ShopList />
        </div>
      </Container>
    </div>
  );
}

export default hot(App);
