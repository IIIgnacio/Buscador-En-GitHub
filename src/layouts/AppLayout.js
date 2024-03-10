import React from 'react'

export default function AppLayout() {
  return (
    <div>AppLayout</div>
  )
}

/* 

<Router>       <Routes>         <Route path="/" element={<HomePage/>} />          <Route path="/repoSearch" element={<RepoSearchPage/>} />         <Route path="/userSearch" element={<UserSearchPage/> } />         <Route path="/repo/:owner/:name" element={<RepoDetailsPage/>} />         <Route path='/user/:username' element={<UserDetails/>}/>       </Routes>     </Router>

*/