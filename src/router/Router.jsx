import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Calculator from "../screens/Calculator/Calculator";
import Home from "../screens/Home/Home";
import Error from "../screens/Error/Error";

const Routers = () => {
    return (
        <>
            <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/calculator" element={<Calculator />} />
                    <Route path="*" element={<Error />} />
                </Routes>
            </Router>
        </>
    );
};

export default Routers;