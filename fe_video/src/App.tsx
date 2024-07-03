import { Route, Routes } from 'react-router-dom'
import Header from './components/Header/Header'
import ProtectedRoute from './components/Header/ProtectedRoute'
import { AuthProvider } from './contexts/AuthContextType'
import AddUser from './pages/AddUser'
import AddVideoUrl from './pages/AddvideoUrl/AddVideoUrl'
import Login from './pages/Login/Login'
import RestreamList from './pages/RestreamList'
import UserList from './pages/UserList'

function App() {

  return (
    <AuthProvider >
      <div className='App'>
        <Header />
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/addUser' element={<AddUser />} />
          <Route path='/updateUser/:id' element={<AddUser />} />
          <Route path='/userList' element={<UserList />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/restream' element={<RestreamList />} />
            <Route path='/addRestream' element={<AddVideoUrl />} />
            <Route path='/updateRestream/:id' element={<AddVideoUrl />} />

          </Route>
        </Routes>
      </div>
    </AuthProvider>

  )
}

export default App
