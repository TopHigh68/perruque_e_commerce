import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Save, ArrowLeft, Upload, X, Eye, EyeOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { AdminLayout } from '@/components/admin/AdminLayout';

interface WigFormData {
  name: string;
  price: number;
  priceRange: 'abordable' | 'standard' | 'premium' | 'luxe';
  hairType: string;
  style: string;
  length: string;
  description: string;
  stock: number;
  isVisible: boolean;
  images: string[];
}

const initialFormData: WigFormData = {
  name: '',
  price: 0,
  priceRange: 'standard',
  hairType: 'Cheveux Humains',
  style: 'Lisse',
  length: '40cm',
  description: '',
  stock: 0,
  isVisible: true,
  images: []
};

const priceRanges = [
  { value: 'abordable', label: 'Abordable (< 200,000 FCFA)' },
  { value: 'standard', label: 'Standard (200,000 - 350,000 FCFA)' },
  { value: 'premium', label: 'Premium (350,000 - 500,000 FCFA)' },
  { value: 'luxe', label: 'Luxe (> 500,000 FCFA)' }
];

const hairTypes = ['Cheveux Humains', 'Synthétique', 'Mixte'];
const styles = ['Lisse', 'Bouclé', 'Ondulé', 'Crépu', 'Frisé'];
const lengths = ['25cm', '30cm', '35cm', '40cm', '45cm', '50cm', '55cm', '60cm'];

export default function WigForm() {
  const [formData, setFormData] = useState<WigFormData>(initialFormData);
  const [isLoading, setIsLoading] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const isEditing = !!id;

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      navigate('/admin/login');
    }

    // Si en mode édition, charger les données existantes
    if (isEditing) {
      // Simulation du chargement des données
      setFormData({
        name: 'Lisse Soyeux Noir',
        price: 294350,
        priceRange: 'premium',
        hairType: 'Cheveux Humains',
        style: 'Lisse',
        length: '45cm',
        description: 'Une magnifique perruque en cheveux humains 100% naturels...',
        stock: 12,
        isVisible: true,
        images: ['/assets/wig-product-1.jpg']
      });
    }
  }, [navigate, isEditing]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulation de sauvegarde
    setTimeout(() => {
      console.log('Données sauvegardées:', formData);
      setIsLoading(false);
      navigate('/admin/dashboard');
    }, 1000);
  };

  const handleImageUpload = (files: FileList | null) => {
    if (!files) return;
    
    Array.from(files).forEach(file => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target?.result as string;
          setFormData(prev => ({
            ...prev,
            images: [...prev.images, imageUrl]
          }));
        };
        reader.readAsDataURL(file);
      }
    });
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    handleImageUpload(e.dataTransfer.files);
  };

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto space-y-8">
        {/* En-tête */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            onClick={() => navigate('/admin/dashboard')}
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Retour
          </Button>
          <div>
            <h1 className="font-serif text-3xl font-medium">
              {isEditing ? 'Modifier la Perruque' : 'Nouvelle Perruque'}
            </h1>
            <p className="text-muted-foreground">
              {isEditing ? 'Modifiez les informations de la perruque' : 'Ajoutez une nouvelle perruque à votre catalogue'}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Informations de base */}
          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <h2 className="font-serif text-xl font-medium mb-6">Informations de Base</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium">Nom de la perruque *</label>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  placeholder="Ex: Lisse Soyeux Noir"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Prix (FCFA) *</label>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData(prev => ({ ...prev, price: Number(e.target.value) }))}
                  placeholder="294350"
                  required
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Gamme de prix</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  value={formData.priceRange}
                  onChange={(e) => setFormData(prev => ({ ...prev, priceRange: e.target.value as any }))}
                >
                  {priceRanges.map(range => (
                    <option key={range.value} value={range.value}>
                      {range.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Type de cheveux</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  value={formData.hairType}
                  onChange={(e) => setFormData(prev => ({ ...prev, hairType: e.target.value }))}
                >
                  {hairTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Style</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  value={formData.style}
                  onChange={(e) => setFormData(prev => ({ ...prev, style: e.target.value }))}
                >
                  {styles.map(style => (
                    <option key={style} value={style}>{style}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Longueur</label>
                <select
                  className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                  value={formData.length}
                  onChange={(e) => setFormData(prev => ({ ...prev, length: e.target.value }))}
                >
                  {lengths.map(length => (
                    <option key={length} value={length}>{length}</option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Stock disponible</label>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData(prev => ({ ...prev, stock: Number(e.target.value) }))}
                  placeholder="12"
                  min="0"
                />
              </div>

              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  id="isVisible"
                  checked={formData.isVisible}
                  onChange={(e) => setFormData(prev => ({ ...prev, isVisible: e.target.checked }))}
                  className="w-4 h-4 text-gold focus:ring-gold border-border rounded"
                />
                <label htmlFor="isVisible" className="text-sm font-medium flex items-center gap-2">
                  {formData.isVisible ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
                  Visible sur le site
                </label>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                placeholder="Décrivez les caractéristiques et avantages de cette perruque..."
                rows={4}
              />
            </div>
          </div>

          {/* Images */}
          <div className="luxury-card bg-card p-6 rounded-xl border border-border/50">
            <h2 className="font-serif text-xl font-medium mb-6">Images</h2>
            
            {/* Zone de téléchargement */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-gold bg-gold/5' : 'border-border'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <p className="text-lg font-medium mb-2">Glissez vos images ici</p>
              <p className="text-muted-foreground mb-4">ou cliquez pour sélectionner</p>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={(e) => handleImageUpload(e.target.files)}
                className="hidden"
                id="image-upload"
              />
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById('image-upload')?.click()}
              >
                Sélectionner des images
              </Button>
            </div>

            {/* Aperçu des images */}
            {formData.images.length > 0 && (
              <div className="mt-6">
                <h3 className="font-medium mb-4">Images téléchargées ({formData.images.length})</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {formData.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Image ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-border"
                      />
                      <button
                        type="button"
                        onClick={() => removeImage(index)}
                        className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/admin/dashboard')}
            >
              Annuler
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-gold hover:bg-gold/90 text-white"
            >
              <Save className="h-4 w-4 mr-2" />
              {isLoading ? 'Sauvegarde...' : (isEditing ? 'Mettre à jour' : 'Créer la perruque')}
            </Button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}