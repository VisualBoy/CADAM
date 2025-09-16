import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ParameterSlider } from './ParameterSlider';

export interface ClinicalParameters {
  diagnosis: string;
  activityLevel: number;
  material: string;
  archSupportHeight: number;
  heelCupDepth: number;
  materialThickness: number;
  hasMetatarsalPad: boolean;
  metatarsalPadHeight: number;
  notes: string;
}

interface ClinicalParameterEditorProps {
  parameters: ClinicalParameters;
  onParameterChange: <K extends keyof ClinicalParameters>(
    param: K,
    value: ClinicalParameters[K],
  ) => void;
}

const ClinicalParameterEditor: React.FC<ClinicalParameterEditorProps> = ({
  parameters,
  onParameterChange: handleParameterChange,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Clinical Parameters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnosis</Label>
          <Select
            value={parameters.diagnosis}
            onValueChange={(value) => handleParameterChange('diagnosis', value)}
          >
            <SelectTrigger id="diagnosis">
              <SelectValue placeholder="Select a diagnosis" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="plantar-fasciitis">
                Plantar Fasciitis
              </SelectItem>
              <SelectItem value="flat-feet">Flat Feet</SelectItem>
              <SelectItem value="high-arch">High Arch</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Activity Level ({parameters.activityLevel})</Label>
          <Slider
            value={[parameters.activityLevel]}
            onValueChange={([value]) =>
              handleParameterChange('activityLevel', value)
            }
            max={10}
            step={1}
            className="py-2"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="material">Material</Label>
          <Select
            value={parameters.material}
            onValueChange={(value) => handleParameterChange('material', value)}
          >
            <SelectTrigger id="material">
              <SelectValue placeholder="Select a material" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="polypropylene">Polypropylene</SelectItem>
              <SelectItem value="eva">EVA Foam</SelectItem>
              <SelectItem value="carbon-fiber">Carbon Fiber</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>Arch Support Height (mm)</Label>
          <ParameterSlider
            parameter={{
              name: 'arch_support_height',
              type: 'slider',
              value: parameters.archSupportHeight,
              min: 5,
              max: 30,
              step: 1,
            }}
            onValueChange={(value) =>
              handleParameterChange('archSupportHeight', value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Heel Cup Depth (mm)</Label>
          <ParameterSlider
            parameter={{
              name: 'heel_cup_depth',
              type: 'slider',
              value: parameters.heelCupDepth,
              min: 0,
              max: 20,
              step: 1,
            }}
            onValueChange={(value) =>
              handleParameterChange('heelCupDepth', value)
            }
          />
        </div>

        <div className="space-y-2">
          <Label>Material Thickness (mm)</Label>
          <ParameterSlider
            parameter={{
              name: 'material_thickness',
              type: 'slider',
              value: parameters.materialThickness,
              min: 2,
              max: 5,
              step: 0.5,
            }}
            onValueChange={(value) =>
              handleParameterChange('materialThickness', value)
            }
          />
        </div>

        <div className="flex items-center justify-between">
          <Label htmlFor="metatarsal-pad">Metatarsal Pad</Label>
          <Switch
            id="metatarsal-pad"
            checked={parameters.hasMetatarsalPad}
            onCheckedChange={(value) =>
              handleParameterChange('hasMetatarsalPad', value)
            }
          />
        </div>

        {parameters.hasMetatarsalPad && (
          <div className="space-y-2">
            <Label>Metatarsal Pad Height (mm)</Label>
            <ParameterSlider
              parameter={{
                name: 'metatarsal_pad_height',
                type: 'slider',
                value: parameters.metatarsalPadHeight,
                min: 2,
                max: 8,
                step: 0.5,
              }}
              onValueChange={(value) =>
                handleParameterChange('metatarsalPadHeight', value)
              }
            />
          </div>
        )}

        <div className="space-y-2">
          <Label htmlFor="notes">Prescription Notes</Label>
          <Textarea
            id="notes"
            placeholder="Enter clinical notes here..."
            value={parameters.notes}
            onChange={(e) => handleParameterChange('notes', e.target.value)}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ClinicalParameterEditor;
