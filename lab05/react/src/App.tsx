import {NewCart} from "./components/cart/NewCart";
import {Cart} from "./components/cart/Cart";
import {Counter} from "./components/effects/Counter";
import {NewCounter} from "./components/counters/NewCounter";
import {Form} from "./components/form/Form";
import {Password} from "./components/form/Password";
import {Login} from "./components/form/Login";
import {Ternary} from "./components/others/Ternary";
import {Update} from "./components/others/Update";
import {Students} from "./components/students/Students";
import {StudentManager} from "./components/students/StudentManager";
import {Title} from "./components/effects/Title";
import {Countdown} from "./components/effects/Countdown";
import {Comment, UserI, CommentI} from "./components/products/Comment";
import {Comments} from "./components/products/Comments";

function App() {
    const user : UserI = {
        fullName: "Jo Mama", id: 124, username: "sifaeuibdaslhfasbdlu"
    }
    return <Comments />
}

export default App
