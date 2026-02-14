import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Search, MapPin, Home, IndianRupee, ChevronDown } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

const cities = ['All Areas', 'Arera Colony', 'MP Nagar', 'Kolar Road', 'Hoshangabad Road', 'Bairagarh', 'Ayodhya Bypass', 'Habibganj', 'Shahpura', 'Misrod', 'Raisen Road']
const propertyTypes = ['All Types', 'Apartment', 'Villa', 'Independent House', 'Plot', 'Penthouse', 'Studio']
const budgetRanges = ['Any Budget', 'Under ₹20 Lac', '₹20-50 Lac', '₹50 Lac - 1 Cr', '₹1-2 Cr', 'Above ₹2 Cr']
const rentBudgets = ['Any Budget', 'Under ₹5,000', '₹5,000 - 10,000', '₹10,000 - 20,000', '₹20,000 - 50,000', 'Above ₹50,000']

function DropdownPortal({ options, value, onChange, onClose, triggerRef }) {
    const [pos, setPos] = useState({ top: 0, left: 0, width: 0 })

    useEffect(() => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect()
            setPos({
                top: rect.bottom + window.scrollY + 4,
                left: rect.left + window.scrollX,
                width: rect.width,
            })
        }
    }, [triggerRef])

    return createPortal(
        <>
            {/* Invisible overlay to close dropdown */}
            <div
                onClick={onClose}
                style={{ position: 'fixed', inset: 0, zIndex: 99998 }}
            />
            {/* Dropdown */}
            <div
                style={{
                    position: 'absolute',
                    top: pos.top,
                    left: pos.left,
                    width: pos.width,
                    background: '#111',
                    border: '1px solid #333',
                    borderRadius: '8px',
                    boxShadow: '0 20px 60px rgba(0,0,0,0.95)',
                    zIndex: 99999,
                    maxHeight: '220px',
                    overflowY: 'auto',
                    padding: '4px 0',
                }}
            >
                {options.map((opt) => (
                    <div
                        key={opt}
                        onClick={() => { onChange(opt); onClose() }}
                        style={{
                            padding: '10px 14px',
                            fontSize: '14px',
                            color: value === opt ? '#ff6600' : '#999',
                            fontWeight: value === opt ? '600' : '400',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#1e1e1e'
                            if (value !== opt) e.currentTarget.style.color = '#fff'
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                            if (value !== opt) e.currentTarget.style.color = '#999'
                        }}
                    >
                        {opt}
                    </div>
                ))}
            </div>
        </>,
        document.body
    )
}

function CustomSelect({ icon: Icon, options, value, onChange, label }) {
    const [open, setOpen] = useState(false)
    const btnRef = useRef(null)

    return (
        <div className="relative flex-1 min-w-[140px]">
            <label style={{ display: 'block', fontSize: '10px', color: '#6b6b6b', marginBottom: '6px', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                {label}
            </label>
            <button
                ref={btnRef}
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '10px 12px',
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '8px',
                    fontSize: '14px',
                    color: '#fff',
                    cursor: 'pointer',
                    fontFamily: 'inherit',
                }}
            >
                <Icon style={{ width: '16px', height: '16px', color: '#6b6b6b', flexShrink: 0 }} />
                <span style={{ flex: 1, textAlign: 'left', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{value}</span>
                <ChevronDown style={{ width: '16px', height: '16px', color: '#6b6b6b', transition: 'transform 0.2s', transform: open ? 'rotate(180deg)' : 'none' }} />
            </button>
            {open && (
                <DropdownPortal
                    options={options}
                    value={value}
                    onChange={onChange}
                    onClose={() => setOpen(false)}
                    triggerRef={btnRef}
                />
            )}
        </div>
    )
}

export default function SearchBox() {
    const navigate = useNavigate()
    const [tab, setTab] = useState('buy')
    const [city, setCity] = useState('All Areas')
    const [type, setType] = useState('All Types')
    const [budget, setBudget] = useState('Any Budget')

    const handleSearch = () => {
        const params = new URLSearchParams()
        if (city !== 'All Areas') params.set('city', city)
        if (type !== 'All Types') params.set('type', type)
        if (budget !== 'Any Budget') params.set('budget', budget)
        params.set('mode', tab)
        navigate(`/${tab}?${params.toString()}`)
    }

    return (
        <div style={{ width: '100%', maxWidth: '768px', margin: '0 auto' }}>
            {/* Tabs */}
            <div style={{ display: 'flex', marginBottom: '16px' }}>
                {['buy', 'rent'].map((t) => (
                    <button
                        key={t}
                        onClick={() => { setTab(t); setBudget('Any Budget') }}
                        style={{
                            padding: '12px 32px',
                            fontSize: '13px',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.1em',
                            borderRadius: '12px 12px 0 0',
                            border: 'none',
                            cursor: 'pointer',
                            fontFamily: 'inherit',
                            transition: 'all 0.3s',
                            background: tab === t ? 'rgba(255,255,255,0.1)' : 'transparent',
                            color: tab === t ? '#ffffff' : '#6b6b6b',
                            borderTop: tab === t ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                            borderLeft: tab === t ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                            borderRight: tab === t ? '1px solid rgba(255,255,255,0.1)' : '1px solid transparent',
                        }}
                    >
                        {t === 'buy' ? 'Buy' : 'Rent'}
                    </button>
                ))}
            </div>

            {/* Search Panel */}
            <div style={{
                background: 'rgba(15,15,15,0.92)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '16px',
                padding: '20px',
            }}>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginBottom: '16px' }}>
                    <CustomSelect icon={MapPin} options={cities} value={city} onChange={setCity} label="Area" />
                    <CustomSelect icon={Home} options={propertyTypes} value={type} onChange={setType} label="Property Type" />
                    <CustomSelect icon={IndianRupee} options={tab === 'buy' ? budgetRanges : rentBudgets} value={budget} onChange={setBudget} label="Budget" />
                </div>
                <button
                    onClick={handleSearch}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '8px',
                        padding: '12px 32px',
                        background: '#ffffff',
                        color: '#000000',
                        fontWeight: 600,
                        fontSize: '14px',
                        border: 'none',
                        borderRadius: '12px',
                        cursor: 'pointer',
                        fontFamily: 'inherit',
                        transition: 'all 0.3s',
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#e5e5e5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#ffffff'}
                >
                    <Search style={{ width: '16px', height: '16px' }} />
                    Search Properties
                </button>
            </div>
        </div>
    )
}
