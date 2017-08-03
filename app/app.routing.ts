import { LoginComponent } from "./pages/login/login.component";
import { ListComponent } from "./pages/list/list.component";
import { BarcodeComponent } from "./pages/barcode/barcode.component";

export const routes = [
  { path: "", component: LoginComponent },
  { path: "list", component: ListComponent },
  { path: "barcode", component: BarcodeComponent }
];

export const navigatableComponents = [
  LoginComponent,
  ListComponent,
  BarcodeComponent
];