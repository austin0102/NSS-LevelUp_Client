import { Route, Routes } from "react-router-dom"
import { Login } from "../components/auth/Login"
import { Register } from "../components/auth/Register"
import { Authorized } from "./Authorized"
import { GameList } from "../components/game/GameList"
import { EventList } from "../components/event/EventList"
import { GameForm } from "../components/game/GameForm"
import { EventForm } from "../components/event/EventForm"
import { UpdateGame } from "../components/game/UpdateGame"
import { UpdateEvent } from "../components/event/UpdateEvent"
import { GameDetails } from "../components/game/GameDetails"


export const ApplicationViews = () => {
    return <>
        <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route element={<Authorized />}>
                <Route path="/games" element={<GameList />} />
                <Route path="/events" element={<EventList />} />
                <Route path="/games/new" element={<GameForm />} />
                <Route path="/events/new" element={<EventForm />} />
                <Route path={`/games/:id`} element={<UpdateGame />} />
                <Route path={`/events/:id`} element={<UpdateEvent />}/>
                <Route path={`/games/details/:id`} element={<GameDetails />}/>


            </Route>
        </Routes>
    </>
}