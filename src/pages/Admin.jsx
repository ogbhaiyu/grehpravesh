import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import { useAuth } from '../context/AuthContext'
import {
    Plus, Edit3, Trash2, X, Upload, Eye, Home, Search,
    LayoutDashboard, Building2, Users, TrendingUp, ChevronDown, Image,
    Shield, UserPlus, UserMinus, AlertCircle
} from 'lucide-react'
import { Link } from 'react-router-dom'

const demoProperties = [
    { id: '1', title: '3 BHK Luxury Apartment in Vijay Nagar', price: 5500000, location: 'Vijay Nagar, Indore', type: 'sell', bedrooms: 3, bathrooms: 2, area_sqft: 1450, badge: 'Verified', image_url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=200&q=60' },
    { id: '2', title: 'Modern Villa with Garden in Kolar Road', price: 15000000, location: 'Kolar Road, Bhopal', type: 'sell', bedrooms: 4, bathrooms: 3, area_sqft: 2800, badge: 'Premium', image_url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=60' },
    { id: '3', title: '2 BHK Apartment near Rajwada', price: 3200000, location: 'Rajwada, Indore', type: 'sell', bedrooms: 2, bathrooms: 1, area_sqft: 950, badge: 'New Launch', image_url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=200&q=60' },
    { id: '4', title: 'Spacious Penthouse in AB Road', price: 22000000, location: 'AB Road, Indore', type: 'sell', bedrooms: 4, bathrooms: 4, area_sqft: 3200, badge: 'Premium', image_url: 'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=200&q=60' },
    { id: '5', title: 'Furnished Studio for Rent in New Palasia', price: 15000, location: 'New Palasia, Indore', type: 'rent', bedrooms: 1, bathrooms: 1, area_sqft: 500, badge: 'Verified', image_url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=200&q=60' },
    { id: '6', title: '3 BHK Independent House in Ayodhya Bypass', price: 7500000, location: 'Ayodhya Bypass, Bhopal', type: 'sell', bedrooms: 3, bathrooms: 2, area_sqft: 1800, badge: 'New Launch', image_url: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=200&q=60' },
]

function formatPrice(price, type) {
    if (type === 'rent') return `₹${Number(price).toLocaleString('en-IN')}/mo`
    if (price >= 10000000) return `₹${(price / 10000000).toFixed(1)} Cr`
    if (price >= 100000) return `₹${(price / 100000).toFixed(0)} Lac`
    return `₹${Number(price).toLocaleString('en-IN')}`
}

const emptyForm = {
    title: '', price: '', location: '', type: 'sell',
    bedrooms: '', bathrooms: '', area_sqft: '', owner_contact: '',
    badge: 'Verified', description: '',
}

export default function Admin() {
    const { isSuperAdmin } = useAuth()
    const [properties, setProperties] = useState([])
    const [loading, setLoading] = useState(true)
    const [modalOpen, setModalOpen] = useState(false)
    const [editId, setEditId] = useState(null)
    const [form, setForm] = useState(emptyForm)
    const [imageFile, setImageFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const [saving, setSaving] = useState(false)
    const [toast, setToast] = useState(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [activeTab, setActiveTab] = useState('properties')

    // Admin management state
    const [admins, setAdmins] = useState([])
    const [adminLoading, setAdminLoading] = useState(false)
    const [newAdminEmail, setNewAdminEmail] = useState('')
    const [adminError, setAdminError] = useState('')

    useEffect(() => {
        fetchProperties()
    }, [])

    async function fetchProperties() {
        try {
            const { data, error } = await supabase
                .from('properties')
                .select('*')
                .order('created_at', { ascending: false })

            if (!error && data && data.length > 0) {
                setProperties(data)
            } else {
                setProperties(demoProperties)
            }
        } catch {
            setProperties(demoProperties)
        } finally {
            setLoading(false)
        }
    }

    async function fetchAdmins() {
        setAdminLoading(true)
        try {
            const { data, error } = await supabase
                .from('admins')
                .select('*')
                .order('created_at', { ascending: true })
            if (!error && data) {
                setAdmins(data)
            }
        } catch {
            // mock mode
        } finally {
            setAdminLoading(false)
        }
    }

    async function addAdmin(email) {
        setAdminError('')
        if (!email || !email.includes('@')) {
            setAdminError('Please enter a valid email')
            return
        }
        try {
            const { error } = await supabase
                .from('admins')
                .insert([{ email: email.toLowerCase(), is_super_admin: false }])
            if (error) throw error
            setNewAdminEmail('')
            showToast(`${email} added as admin`)
            fetchAdmins()
        } catch (err) {
            setAdminError(err.message || 'Failed to add admin')
        }
    }

    async function removeAdmin(id, email) {
        if (!confirm(`Remove ${email} as admin?`)) return
        try {
            const { error } = await supabase
                .from('admins')
                .delete()
                .eq('id', id)
            if (error) throw error
            showToast(`${email} removed from admins`)
            fetchAdmins()
        } catch {
            showToast('Failed to remove admin', 'error')
        }
    }

    function showToast(message, type = 'success') {
        setToast({ message, type })
        setTimeout(() => setToast(null), 3000)
    }

    function openAddModal() {
        setForm(emptyForm)
        setEditId(null)
        setImageFile(null)
        setImagePreview(null)
        setModalOpen(true)
    }

    function openEditModal(property) {
        setForm({
            title: property.title,
            price: String(property.price),
            location: property.location,
            type: property.type,
            bedrooms: String(property.bedrooms || ''),
            bathrooms: String(property.bathrooms || ''),
            area_sqft: String(property.area_sqft || ''),
            owner_contact: property.owner_contact || '',
            badge: property.badge || 'Verified',
            description: property.description || '',
        })
        setEditId(property.id)
        setImageFile(null)
        setImagePreview(property.image_url || null)
        setModalOpen(true)
    }

    async function handleDeleteProperty(id) {
        if (!confirm('Are you sure you want to delete this property?')) return

        try {
            const { error } = await supabase.from('properties').delete().eq('id', id)
            if (error) throw error
            setProperties((prev) => prev.filter((p) => p.id !== id))
            showToast('Property deleted successfully')
        } catch {
            showToast('Failed to delete property', 'error')
        }
    }

    function handleImageChange(e) {
        const file = e.target.files[0]
        if (file) {
            setImageFile(file)
            setImagePreview(URL.createObjectURL(file))
        }
    }

    async function handleSubmit(e) {
        e.preventDefault()
        setSaving(true)

        try {
            let image_url = imagePreview

            // Upload image if new file selected
            if (imageFile) {
                const fileExt = imageFile.name.split('.').pop()
                const fileName = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}.${fileExt}`
                const { data: uploadData, error: uploadError } = await supabase.storage
                    .from('property-images')
                    .upload(fileName, imageFile)

                if (uploadError) throw uploadError

                const { data: { publicUrl } } = supabase.storage
                    .from('property-images')
                    .getPublicUrl(fileName)

                image_url = publicUrl
            }

            const propertyData = {
                title: form.title,
                price: parseFloat(form.price),
                location: form.location,
                type: form.type,
                bedrooms: parseInt(form.bedrooms) || null,
                bathrooms: parseInt(form.bathrooms) || null,
                area_sqft: parseInt(form.area_sqft) || null,
                owner_contact: form.owner_contact,
                badge: form.badge,
                image_url: image_url || null,
            }

            if (editId) {
                const { error } = await supabase
                    .from('properties')
                    .update(propertyData)
                    .eq('id', editId)
                if (error) throw error
                showToast('Property updated successfully')
            } else {
                const { error } = await supabase
                    .from('properties')
                    .insert([propertyData])
                if (error) throw error
                showToast('Property added successfully')
            }

            setModalOpen(false)
            fetchProperties()
        } catch (err) {
            showToast(err.message || 'Something went wrong', 'error')
        } finally {
            setSaving(false)
        }
    }

    const filteredProperties = properties.filter((p) =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.location.toLowerCase().includes(searchQuery.toLowerCase())
    )

    const stats = [
        { label: 'Total Listings', value: properties.length, icon: Building2, color: 'text-blue-400 bg-blue-400/10' },
        { label: 'For Sale', value: properties.filter((p) => p.type === 'sell').length, icon: TrendingUp, color: 'text-green-400 bg-green-400/10' },
        { label: 'For Rent', value: properties.filter((p) => p.type === 'rent').length, icon: Home, color: 'text-secondary bg-secondary/10' },
        { label: 'Verified', value: properties.filter((p) => p.badge === 'Verified').length, icon: Users, color: 'text-purple-400 bg-purple-400/10' },
    ]

    return (
        <div className="min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <LayoutDashboard className="w-5 h-5 text-secondary" />
                            <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
                        </div>
                        <p className="text-sm text-gray-muted">Manage all property listings</p>
                    </div>
                    {activeTab === 'properties' && (
                        <button
                            onClick={openAddModal}
                            className="flex items-center gap-2 px-5 py-2.5 bg-white text-black font-semibold text-sm rounded-xl hover:bg-gray-100 transition-all"
                        >
                            <Plus className="w-4 h-4" />
                            Add New Property
                        </button>
                    )}
                </div>

                {/* Tabs - only show if super admin */}
                {isSuperAdmin && (
                    <div className="flex gap-1 mb-6 p-1 bg-dark-card border border-dark-border rounded-xl w-fit">
                        <button
                            onClick={() => setActiveTab('properties')}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'properties'
                                ? 'bg-white text-black'
                                : 'text-gray-muted hover:text-white'
                                }`}
                        >
                            <Building2 className="w-4 h-4" />
                            Properties
                        </button>
                        <button
                            onClick={() => { setActiveTab('admins'); fetchAdmins() }}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'admins'
                                ? 'bg-white text-black'
                                : 'text-gray-muted hover:text-white'
                                }`}
                        >
                            <Shield className="w-4 h-4" />
                            Manage Admins
                        </button>
                    </div>
                )}

                {activeTab === 'properties' && (<>
                    {/* Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                        {stats.map((stat) => (
                            <div
                                key={stat.label}
                                className="p-5 rounded-xl bg-dark-card border border-dark-border"
                            >
                                <div className={`w-10 h-10 rounded-lg ${stat.color} flex items-center justify-center mb-3`}>
                                    <stat.icon className="w-5 h-5" />
                                </div>
                                <div className="text-2xl font-bold text-white">{stat.value}</div>
                                <div className="text-xs text-gray-muted mt-1">{stat.label}</div>
                            </div>
                        ))}
                    </div>

                    {/* Search */}
                    <div className="relative mb-6">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-muted" />
                        <input
                            type="text"
                            placeholder="Search properties by title or location..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 bg-dark-card border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                        />
                    </div>

                    {/* Table */}
                    <div className="rounded-xl bg-dark-card border border-dark-border overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead>
                                    <tr className="border-b border-dark-border">
                                        <th className="text-left px-5 py-4 text-xs font-semibold text-gray-muted uppercase tracking-wider">Property</th>
                                        <th className="text-left px-5 py-4 text-xs font-semibold text-gray-muted uppercase tracking-wider hidden sm:table-cell">Location</th>
                                        <th className="text-left px-5 py-4 text-xs font-semibold text-gray-muted uppercase tracking-wider">Price</th>
                                        <th className="text-left px-5 py-4 text-xs font-semibold text-gray-muted uppercase tracking-wider hidden md:table-cell">Type</th>
                                        <th className="text-left px-5 py-4 text-xs font-semibold text-gray-muted uppercase tracking-wider hidden lg:table-cell">Specs</th>
                                        <th className="text-right px-5 py-4 text-xs font-semibold text-gray-muted uppercase tracking-wider">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {loading ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-20">
                                                <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto" />
                                            </td>
                                        </tr>
                                    ) : filteredProperties.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="text-center py-20 text-sm text-gray-muted">
                                                No properties found
                                            </td>
                                        </tr>
                                    ) : (
                                        filteredProperties.map((property) => (
                                            <tr
                                                key={property.id}
                                                className="border-b border-dark-border last:border-0 hover:bg-white/[0.02] transition-colors"
                                            >
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0 bg-dark-border">
                                                            {property.image_url ? (
                                                                <img src={property.image_url} alt="" className="w-full h-full object-cover" />
                                                            ) : (
                                                                <div className="w-full h-full flex items-center justify-center">
                                                                    <Image className="w-5 h-5 text-gray-muted" />
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div className="min-w-0">
                                                            <p className="text-sm font-medium text-white truncate max-w-[200px]">{property.title}</p>
                                                            <p className="text-xs text-gray-muted sm:hidden">{property.location}</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-5 py-4 text-sm text-gray-text hidden sm:table-cell">{property.location}</td>
                                                <td className="px-5 py-4 text-sm font-medium text-white">
                                                    {formatPrice(property.price, property.type)}
                                                </td>
                                                <td className="px-5 py-4 hidden md:table-cell">
                                                    <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${property.type === 'rent'
                                                        ? 'bg-blue-400/10 text-blue-400'
                                                        : 'bg-green-400/10 text-green-400'
                                                        }`}>
                                                        {property.type === 'rent' ? 'Rent' : 'Sale'}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4 text-xs text-gray-text hidden lg:table-cell">
                                                    {property.bedrooms}B / {property.bathrooms}Ba / {property.area_sqft} sqft
                                                </td>
                                                <td className="px-5 py-4">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <Link
                                                            to={`/property/${property.id}`}
                                                            className="p-2 rounded-lg hover:bg-white/5 text-gray-muted hover:text-white transition-all"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => openEditModal(property)}
                                                            className="p-2 rounded-lg hover:bg-white/5 text-gray-muted hover:text-white transition-all"
                                                            title="Edit"
                                                        >
                                                            <Edit3 className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => handleDeleteProperty(property.id)}
                                                            className="p-2 rounded-lg hover:bg-red-500/10 text-gray-muted hover:text-red-400 transition-all"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>)}

                {/* Admin Management Panel */}
                {activeTab === 'admins' && isSuperAdmin && (
                    <div className="space-y-6">
                        {/* Add Admin */}
                        <div className="p-6 rounded-xl bg-dark-card border border-dark-border">
                            <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <UserPlus className="w-5 h-5 text-secondary" />
                                Add New Admin
                            </h3>
                            <div className="flex gap-3">
                                <input
                                    type="email"
                                    value={newAdminEmail}
                                    onChange={(e) => { setNewAdminEmail(e.target.value); setAdminError('') }}
                                    placeholder="Enter admin email address..."
                                    className="flex-1 px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                    onKeyDown={(e) => e.key === 'Enter' && addAdmin(newAdminEmail)}
                                />
                                <button
                                    onClick={() => addAdmin(newAdminEmail)}
                                    className="flex items-center gap-2 px-5 py-3 bg-white text-black font-semibold text-sm rounded-xl hover:bg-gray-100 transition-all"
                                >
                                    <UserPlus className="w-4 h-4" />
                                    Add Admin
                                </button>
                            </div>
                            {adminError && (
                                <div className="flex items-center gap-2 mt-3 text-sm text-red-400">
                                    <AlertCircle className="w-4 h-4" />
                                    {adminError}
                                </div>
                            )}
                            <p className="text-xs text-gray-muted mt-3">
                                The email must belong to a registered user. They will gain admin access immediately.
                            </p>
                        </div>

                        {/* Admin List */}
                        <div className="rounded-xl bg-dark-card border border-dark-border overflow-hidden">
                            <div className="px-5 py-4 border-b border-dark-border">
                                <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-secondary" />
                                    Current Admins
                                </h3>
                            </div>
                            {adminLoading ? (
                                <div className="text-center py-12">
                                    <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin mx-auto" />
                                </div>
                            ) : admins.length === 0 ? (
                                <div className="text-center py-12 text-sm text-gray-muted">
                                    No admins found. Make sure Supabase is configured and the admins table is seeded.
                                </div>
                            ) : (
                                <div className="divide-y divide-dark-border">
                                    {admins.map((admin) => (
                                        <div
                                            key={admin.id}
                                            className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.02] transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${admin.is_super_admin
                                                    ? 'bg-secondary/10 text-secondary'
                                                    : 'bg-blue-400/10 text-blue-400'
                                                    }`}>
                                                    <Shield className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium text-white">{admin.email}</p>
                                                    <p className="text-xs text-gray-muted">
                                                        {admin.is_super_admin ? 'Super Admin' : 'Admin'}
                                                        {admin.created_at && ` • Added ${new Date(admin.created_at).toLocaleDateString()}`}
                                                    </p>
                                                </div>
                                            </div>
                                            {!admin.is_super_admin && (
                                                <button
                                                    onClick={() => removeAdmin(admin.id, admin.email)}
                                                    className="flex items-center gap-1.5 px-3 py-2 text-sm text-gray-muted hover:text-red-400 hover:bg-red-400/5 rounded-lg transition-all"
                                                >
                                                    <UserMinus className="w-4 h-4" />
                                                    Remove
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setModalOpen(false)} />
                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-dark-card border border-dark-border rounded-2xl animate-scale-in">
                        {/* Modal Header */}
                        <div className="sticky top-0 z-10 flex items-center justify-between p-6 border-b border-dark-border bg-dark-card rounded-t-2xl">
                            <h2 className="text-lg font-bold text-white">
                                {editId ? 'Edit Property' : 'Add New Property'}
                            </h2>
                            <button
                                onClick={() => setModalOpen(false)}
                                className="p-2 rounded-lg hover:bg-white/5 text-gray-muted hover:text-white transition-all"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Modal Body */}
                        <form onSubmit={handleSubmit} className="p-6 space-y-5">
                            {/* Image Upload */}
                            <div>
                                <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">
                                    Property Photo
                                </label>
                                <div
                                    className="relative border-2 border-dashed border-dark-border rounded-xl p-6 text-center cursor-pointer hover:border-white/20 transition-all"
                                    onClick={() => document.getElementById('image-upload').click()}
                                >
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="w-full h-48 object-cover rounded-lg" />
                                            <button
                                                type="button"
                                                onClick={(e) => { e.stopPropagation(); setImageFile(null); setImagePreview(null) }}
                                                className="absolute top-2 right-2 p-1 bg-black/60 rounded-full text-white hover:bg-black/80"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex flex-col items-center gap-2">
                                            <Upload className="w-8 h-8 text-gray-muted" />
                                            <p className="text-sm text-gray-muted">Click to upload property image</p>
                                            <p className="text-xs text-gray-muted">JPG, PNG up to 5MB</p>
                                        </div>
                                    )}
                                    <input
                                        id="image-upload"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Title */}
                            <div>
                                <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Title</label>
                                <input
                                    type="text"
                                    value={form.title}
                                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g., 3 BHK Apartment in Vijay Nagar"
                                    className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                    required
                                />
                            </div>

                            {/* Price + Type */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Price (₹)</label>
                                    <input
                                        type="number"
                                        value={form.price}
                                        onChange={(e) => setForm({ ...form, price: e.target.value })}
                                        placeholder="e.g., 5500000"
                                        className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Type</label>
                                    <select
                                        value={form.type}
                                        onChange={(e) => setForm({ ...form, type: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white focus:outline-none focus:border-white/20 transition-all"
                                    >
                                        <option value="sell" className="bg-dark-card">For Sale</option>
                                        <option value="rent" className="bg-dark-card">For Rent</option>
                                    </select>
                                </div>
                            </div>

                            {/* Location */}
                            <div>
                                <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Location</label>
                                <input
                                    type="text"
                                    value={form.location}
                                    onChange={(e) => setForm({ ...form, location: e.target.value })}
                                    placeholder="e.g., Vijay Nagar, Indore"
                                    className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                    required
                                />
                            </div>

                            {/* Specs row */}
                            <div className="grid grid-cols-3 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Bedrooms</label>
                                    <input
                                        type="number"
                                        value={form.bedrooms}
                                        onChange={(e) => setForm({ ...form, bedrooms: e.target.value })}
                                        placeholder="3"
                                        className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Bathrooms</label>
                                    <input
                                        type="number"
                                        value={form.bathrooms}
                                        onChange={(e) => setForm({ ...form, bathrooms: e.target.value })}
                                        placeholder="2"
                                        className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Area (sqft)</label>
                                    <input
                                        type="number"
                                        value={form.area_sqft}
                                        onChange={(e) => setForm({ ...form, area_sqft: e.target.value })}
                                        placeholder="1450"
                                        className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                            </div>

                            {/* Owner Contact + Badge */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Owner Contact</label>
                                    <input
                                        type="text"
                                        value={form.owner_contact}
                                        onChange={(e) => setForm({ ...form, owner_contact: e.target.value })}
                                        placeholder="919876543210"
                                        className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Badge</label>
                                    <select
                                        value={form.badge}
                                        onChange={(e) => setForm({ ...form, badge: e.target.value })}
                                        className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white focus:outline-none focus:border-white/20 transition-all"
                                    >
                                        <option value="Verified" className="bg-dark-card">Verified</option>
                                        <option value="New Launch" className="bg-dark-card">New Launch</option>
                                        <option value="Premium" className="bg-dark-card">Premium</option>
                                    </select>
                                </div>
                            </div>

                            {/* Description */}
                            <div>
                                <label className="block text-xs font-medium text-gray-muted uppercase tracking-wider mb-2">Description</label>
                                <textarea
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    placeholder="Describe the property..."
                                    rows={3}
                                    className="w-full px-4 py-3 bg-white/5 border border-dark-border rounded-xl text-sm text-white placeholder-gray-muted focus:outline-none focus:border-white/20 transition-all resize-none"
                                />
                            </div>

                            {/* Submit */}
                            <div className="flex items-center gap-3 pt-2">
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-white text-black font-semibold rounded-xl hover:bg-gray-100 transition-all disabled:opacity-50"
                                >
                                    {saving ? (
                                        <div className="w-5 h-5 border-2 border-black/20 border-t-black rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            {editId ? <Edit3 className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                                            {editId ? 'Update Property' : 'Add Property'}
                                        </>
                                    )}
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setModalOpen(false)}
                                    className="px-6 py-3 bg-white/5 border border-dark-border text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Toast */}
            {toast && (
                <div className={`fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl text-sm font-medium animate-scale-in ${toast.type === 'error'
                    ? 'bg-red-500/10 border border-red-500/20 text-red-400'
                    : 'bg-green-500/10 border border-green-500/20 text-green-400'
                    }`}>
                    {toast.message}
                </div>
            )}
        </div>
    )
}
