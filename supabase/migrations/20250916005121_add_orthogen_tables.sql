-- Create patients table
CREATE TABLE public.patients (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    date_of_birth DATE,
    medical_record_number TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Add RLS
ALTER TABLE public.patients ENABLE ROW LEVEL SECURITY;
-- Add Policy
CREATE POLICY "Users can manage their own patient records"
ON public.patients
FOR ALL
USING (auth.uid() = user_id);


-- Create scans table
CREATE TABLE public.scans (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    patient_id UUID REFERENCES public.patients(id) ON DELETE CASCADE,
    scan_type TEXT NOT NULL, -- 'foot_scan', 'gait_analysis', etc.
    status TEXT NOT NULL, -- 'uploading', 'processing', 'completed', 'failed'
    image_count INTEGER DEFAULT 0,
    processing_started_at TIMESTAMPTZ,
    processing_completed_at TIMESTAMPTZ,
    scan_data JSONB, -- Store extracted measurements and landmarks
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Add RLS
ALTER TABLE public.scans ENABLE ROW LEVEL SECURITY;
-- Add Policy
CREATE POLICY "Users can manage scans of their patients"
ON public.scans
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.patients p
    WHERE p.id = scans.patient_id AND p.user_id = auth.uid()
  )
);


-- Create orthoses table
CREATE TABLE public.orthoses (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES public.scans(id) ON DELETE CASCADE,
    clinical_parameters JSONB NOT NULL,
    openscad_code TEXT NOT NULL,
    generated_at TIMESTAMPTZ DEFAULT NOW(),
    status TEXT DEFAULT 'draft' -- 'draft', 'approved', 'manufactured'
);
-- Add RLS
ALTER TABLE public.orthoses ENABLE ROW LEVEL SECURITY;
-- Add Policy
CREATE POLICY "Users can manage orthoses for their patients"
ON public.orthoses
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.scans s
    JOIN public.patients p ON s.patient_id = p.id
    WHERE s.id = orthoses.scan_id AND p.user_id = auth.uid()
  )
);

-- Create processing_jobs table
CREATE TABLE public.processing_jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scan_id UUID REFERENCES public.scans(id) ON DELETE CASCADE,
    status TEXT NOT NULL DEFAULT 'queued', -- 'queued', 'processing', 'completed', 'failed'
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
-- Add RLS
ALTER TABLE public.processing_jobs ENABLE ROW LEVEL SECURITY;
-- Add Policy
CREATE POLICY "Users can view processing jobs for their patients"
ON public.processing_jobs
FOR ALL
USING (
  EXISTS (
    SELECT 1
    FROM public.scans s
    JOIN public.patients p ON s.patient_id = p.id
    WHERE s.id = processing_jobs.scan_id AND p.user_id = auth.uid()
  )
);

-- Create clinical_parameters table
CREATE TABLE public.clinical_parameters (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE, -- Can be null for global presets
    name TEXT NOT NULL,
    parameters JSONB NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
-- Add RLS
ALTER TABLE public.clinical_parameters ENABLE ROW LEVEL SECURITY;
-- Add Policy for user-specific presets
CREATE POLICY "Users can manage their own clinical parameter presets"
ON public.clinical_parameters
FOR ALL
USING (auth.uid() = user_id);
-- Add Policy for public presets
CREATE POLICY "Public clinical parameter presets are viewable by everyone"
ON public.clinical_parameters
FOR SELECT
USING (user_id IS NULL);
