import { useState } from 'react'
import { Link } from 'react-router-dom'
import { checkPasscode, DEFAULT_PASSCODE, exportAll, fileToDataUrl, importAll, resetAll, sha256, useData, write } from '../data/store'
import { imageSrc } from '../data/images'

const AUTH_KEY = 'melanda_admin_session'
const TABS = ['Inbox', 'Services', 'Repairs', 'Portfolio', 'Settings']

function Login({ onOk }) {
  const [pw, setPw] = useState('')
  const [err, setErr] = useState('')
  const submit = async (e) => {
    e.preventDefault()
    if (await checkPasscode(pw)) {
      try { sessionStorage.setItem(AUTH_KEY, '1') } catch { /* ignore */ }
      onOk()
    } else setErr('Incorrect passcode')
  }
  return (
    <div className="admin-body"><div className="admin-login"><form className="admin-login-box" onSubmit={submit}>
      <h1>Admin</h1><p>Enter your passcode to manage the site.</p>
      <input type="password" autoFocus placeholder="Passcode" value={pw} onChange={(e) => setPw(e.target.value)} />
      <div className="admin-login-error">{err}</div>
      <button className="btn btn-primary" type="submit">Sign in</button>
      <p style={{ marginTop: '1.2rem' }}><Link to="/">← Back to site</Link></p>
    </form></div></div>
  )
}

function Inbox() {
  const messages = useData('messages')
  const update = (id, patch) => write('messages', messages.map((m) => (m.id === id ? { ...m, ...patch } : m)))
  if (!messages.length) return <div className="admin-empty">No enquiries yet.</div>
  return (
    <>
      {messages.map((m) => (
        <div className="admin-card" key={m.id} style={m.read ? { opacity: 0.7 } : undefined}>
          <div className="admin-msg-head">
            <div><div className="admin-msg-name">{m.name}{!m.read && ' •'}</div>
              <div className="admin-msg-meta">{m.email}{m.phone && ` · ${m.phone}`}</div></div>
            <div className="admin-msg-date">{new Date(m.date).toLocaleString()}</div>
          </div>
          <div className="admin-msg-tags">
            {m.service && <span className="admin-badge">{m.service}</span>}
            {m.budget && <span className="admin-badge">Budget: {m.budget}</span>}
          </div>
          <p className="admin-msg-body" style={{ whiteSpace: 'pre-wrap' }}>{m.message}</p>
          <div className="admin-actions">
            <button onClick={() => update(m.id, { read: !m.read })}>{m.read ? 'Mark unread' : 'Mark read'}</button>
            <button onClick={() => { window.location.href = `mailto:${m.email}?subject=Re: your enquiry` }}>Reply</button>
            <button onClick={() => confirm('Delete this message?') && write('messages', messages.filter((x) => x.id !== m.id))}>Delete</button>
          </div>
        </div>
      ))}
    </>
  )
}

function Services() {
  const list = useData('services')
  const edit = (i, patch) => write('services', list.map((s, j) => (j === i ? { ...s, ...patch } : s)))
  return (
    <>
      {list.map((s, i) => (
        <div className="admin-card" key={i}>
          <div className="svc-edit-row">
            <input aria-label="Name" placeholder="Service name" value={s.name} onChange={(e) => edit(i, { name: e.target.value })} />
            <input aria-label="Tags" placeholder="Tags, comma separated" value={s.tags.join(', ')} onChange={(e) => edit(i, { tags: e.target.value.split(',').map((t) => t.trimStart()) })} onBlur={(e) => edit(i, { tags: e.target.value.split(',').map((t) => t.trim()).filter(Boolean) })} />
            <input aria-label="Price" type="number" min="0" value={s.price} onChange={(e) => edit(i, { price: e.target.value === '' ? '' : Number(e.target.value) })} />
            <input aria-label="Unit" placeholder="starting at" value={s.unit} onChange={(e) => edit(i, { unit: e.target.value })} />
            <button className="svc-remove" aria-label="Remove" onClick={() => confirm(`Remove "${s.name}"?`) && write('services', list.filter((_, j) => j !== i))}>✕</button>
            <textarea aria-label="Description" value={s.desc} onChange={(e) => edit(i, { desc: e.target.value })} />
          </div>
        </div>
      ))}
      <button className="btn btn-ghost" onClick={() => write('services', [...list, { name: 'New service', desc: '', tags: [], price: 0, unit: 'starting at' }])}>+ Add service</button>
    </>
  )
}

function Repairs() {
  const list = useData('repairs')
  const edit = (i, patch) => write('repairs', list.map((r, j) => (j === i ? { ...r, ...patch } : r)))
  return (
    <>
      <div className="admin-card">
        {list.map((r, i) => (
          <div className="rep-edit-row" key={i}>
            <input aria-label="Item" value={r.item} onChange={(e) => edit(i, { item: e.target.value })} />
            <input aria-label="Price" type="number" min="0" value={r.price} onChange={(e) => edit(i, { price: e.target.value === '' ? '' : Number(e.target.value) })} />
            <input aria-label="Note" placeholder="Note (optional)" value={r.note} onChange={(e) => edit(i, { note: e.target.value })} />
            <button className="svc-remove" aria-label="Remove" onClick={() => write('repairs', list.filter((_, j) => j !== i))}>✕</button>
          </div>
        ))}
      </div>
      <button className="btn btn-ghost" onClick={() => write('repairs', [...list, { item: 'New repair', price: 0, note: '' }])}>+ Add repair</button>
    </>
  )
}

function Portfolio({ flash }) {
  const list = useData('portfolio')
  const edit = (id, patch) => write('portfolio', list.map((p) => (p.id === id ? { ...p, ...patch } : p)))
  const upload = async (id, file) => {
    if (!file) return
    try {
      const image = await fileToDataUrl(file)
      if (!write('portfolio', list.map((p) => (p.id === id ? { ...p, image } : p)))) flash('Storage is full — remove some images first.')
    } catch { flash('Could not read that image.') }
  }
  const add = async (file) => {
    if (!file) return
    try {
      const image = await fileToDataUrl(file)
      const item = { id: 'p' + Date.now(), title: file.name.replace(/\.[^.]+$/, ''), category: 'Custom', desc: '', image, tone: 0 }
      if (!write('portfolio', [item, ...list])) flash('Storage is full — remove some images first.')
    } catch { flash('Could not read that image.') }
  }
  return (
    <>
      <p className="admin-note">Photos are resized and stored in this browser. Use Settings → Backup to save a copy.</p>
      <label className="btn btn-primary" style={{ marginBottom: '1.2rem', cursor: 'pointer' }}>+ Upload new photo
        <input type="file" accept="image/*" hidden onChange={(e) => { add(e.target.files[0]); e.target.value = '' }} /></label>
      <div className="admin-pgrid">
        {list.map((p) => (
          <div className="admin-pitem" key={p.id}>
            <div className="thumb">{imageSrc(p) ? <img src={imageSrc(p)} alt="" /> : 'No photo yet'}</div>
            <div className="body">
              <input aria-label="Title" value={p.title} onChange={(e) => edit(p.id, { title: e.target.value })} />
              <input aria-label="Category" value={p.category} onChange={(e) => edit(p.id, { category: e.target.value })} />
              <input aria-label="Description" placeholder="Description" value={p.desc} onChange={(e) => edit(p.id, { desc: e.target.value })} />
              <div className="admin-actions" style={{ marginTop: 0 }}>
                <label><button onClick={(e) => e.currentTarget.nextSibling.click()}>{imageSrc(p) ? 'Replace photo' : 'Add photo'}</button>
                  <input type="file" accept="image/*" hidden onChange={(e) => { upload(p.id, e.target.files[0]); e.target.value = '' }} /></label>
                <button onClick={() => confirm(`Delete "${p.title}"?`) && write('portfolio', list.filter((x) => x.id !== p.id))}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

function Settings({ flash }) {
  const saved = useData('settings')
  const [d, setD] = useState(saved)
  const [pass, setPass] = useState('')
  const set = (k) => (e) => setD({ ...d, [k]: e.target.value })
  const field = (k, label, props = {}) => (
    <div className="admin-field"><label htmlFor={k}>{label}</label><input id={k} value={d[k]} onChange={set(k)} {...props} /></div>
  )
  const save = async () => {
    const next = { ...d }
    if (pass) {
      if (pass.length < 6) return flash('Passcode must be at least 6 characters.')
      next.passHash = await sha256(pass)
    }
    flash(write('settings', next) ? 'Saved' : 'Could not save')
    setPass('')
  }
  const download = () => {
    const a = document.createElement('a')
    a.href = URL.createObjectURL(new Blob([JSON.stringify(exportAll(), null, 2)], { type: 'application/json' }))
    a.download = 'melanda-site-backup.json'
    a.click()
  }
  const restore = async (file) => {
    try { importAll(JSON.parse(await file.text())); flash('Backup restored') } catch { flash('That file is not a valid backup.') }
  }
  return (
    <>
      <div className="admin-card">
        <div className="admin-two">{field('email', 'CONTACT EMAIL')}{field('phone', 'PHONE')}</div>
        <div className="admin-two">{field('location', 'LOCATION')}{field('hours', 'HOURS')}</div>
        <div className="admin-two">{field('instagram', 'INSTAGRAM URL')}{field('pinterest', 'PINTEREST URL')}</div>
        {field('tiktok', 'TIKTOK URL')}
        {field('formEndpoint', 'FORM EMAIL ENDPOINT (e.g. a Formspree URL)', { placeholder: 'https://formspree.io/f/…' })}
        <div className="admin-field"><label htmlFor="bio">BIO (blank line between paragraphs)</label><textarea id="bio" value={d.bio} onChange={set('bio')} /></div>
        <div className="admin-field"><label htmlFor="pass">NEW ADMIN PASSCODE (leave blank to keep current)</label><input id="pass" type="password" value={pass} onChange={(e) => setPass(e.target.value)} /></div>
        {!saved.passHash && <p className="admin-note">You're still using the default passcode <b>{DEFAULT_PASSCODE}</b>. Change it above.</p>}
        <button className="btn btn-primary" onClick={save}>Save settings</button>
      </div>
      <div className="admin-card">
        <h3 style={{ marginBottom: '.6rem' }}>Backup</h3>
        <div className="admin-actions" style={{ marginTop: 0 }}>
          <button onClick={download}>Download backup</button>
          <label><button onClick={(e) => e.currentTarget.nextSibling.click()}>Restore backup</button>
            <input type="file" accept="application/json" hidden onChange={(e) => { restore(e.target.files[0]); e.target.value = '' }} /></label>
          <button onClick={() => confirm('Reset everything (services, prices, photos, messages) to defaults?') && (resetAll(), flash('Reset to defaults'))}>Reset to defaults</button>
        </div>
      </div>
    </>
  )
}

export default function Admin() {
  const [authed, setAuthed] = useState(() => { try { return sessionStorage.getItem(AUTH_KEY) === '1' } catch { return false } })
  const [tab, setTab] = useState('Inbox')
  const [toast, setToast] = useState('')
  const messages = useData('messages')
  const flash = (t) => { setToast(t); setTimeout(() => setToast(''), 2500) }
  if (!authed) return <Login onOk={() => setAuthed(true)} />
  const unread = messages.filter((m) => !m.read).length
  return (
    <div className="admin-body"><div className="admin-shell">
      <aside className="admin-side">
        <div className="admin-brand">Melanda Alcius<span>ADMIN</span></div>
        <ul className="admin-nav">
          {TABS.map((t) => (
            <li key={t}><button className={tab === t ? 'is-active' : ''} onClick={() => setTab(t)}>{t}{t === 'Inbox' && unread ? ` (${unread})` : ''}</button></li>
          ))}
        </ul>
        <div className="admin-side-foot admin-nav">
          <Link to="/"><button>← View site</button></Link>
          <button onClick={() => { try { sessionStorage.removeItem(AUTH_KEY) } catch { /* ignore */ } setAuthed(false) }}>Sign out</button>
        </div>
      </aside>
      <main className="admin-main">
        <div className="admin-head"><div><h1>{tab}</h1></div></div>
        {tab === 'Inbox' && <Inbox />}
        {tab === 'Services' && <Services />}
        {tab === 'Repairs' && <Repairs />}
        {tab === 'Portfolio' && <Portfolio flash={flash} />}
        {tab === 'Settings' && <Settings flash={flash} />}
      </main>
      {toast && <div className="admin-flash" role="status">{toast}</div>}
    </div></div>
  )
}
