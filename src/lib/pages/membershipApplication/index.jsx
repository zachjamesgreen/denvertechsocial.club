/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-console */
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  Text,
  ButtonGroup,
  HStack,
} from "@chakra-ui/react";
import { yupResolver } from "@hookform/resolvers/yup";
import { NextSeo } from "next-seo";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";

import { submitApplicationEntry } from "lib/helpers/airtable";

const membershipApplicationSchema = yup
  .object({
    name: yup.string().required(),
    email: yup.string().required(),
    sector: yup.string().required(),
    area: yup.string().required(),
    reason: yup.string().required(),
    agreement: yup.boolean().oneOf([true]),
    socials: yup.string(),
  })
  .required();

const requiredString = "This field is required.";

const MembershipApplication = () => {
  const router = useRouter();

  const [formSubmitSuccess, setformSubmitSuccess] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm({ resolver: yupResolver(membershipApplicationSchema) });

  const onSubmit = async (formData) => {
    // ga.event({
    //   action: "Submitted Membership Application",
    //   params: { form_data: formData },
    // });

    try {
      submitApplicationEntry(formData);
      setformSubmitSuccess(true);
      router.push("/membership-application-success");
    } catch (error) {
      console.error("error", error);
      // setFormErrors(error);
    }
  };

  return (
    <Box paddingY="20">
      <NextSeo title="Membership Application" />
      <Box
        maxWidth="760px"
        marginX={{ base: "4", md: "auto" }}
        paddingY="12"
        paddingX={{ base: "4", md: "0" }}
        background="white"
        borderRadius="lg"
      >
        <form
          onSubmit={handleSubmit(onSubmit)}
          style={{
            display: "flex",
            flexDirection: "column",
            maxWidth: "580px",
            alignItems: "center",
            margin: "auto",
          }}
        >
          <Heading size="3xl" marginBottom="12">
            Membership Application
          </Heading>
          <Text fontSize="lg" marginBottom="8">
            Membership is free! All we ask is that you&apos;re involved in tech
            in the Greater Denver area, and that you&apos;re willing to come in
            here as a good person! If you&apos;re interested in joining us fill
            out this form, and we&apos;ll get back to you in a few days! Also,
            be sure to check out our rules & code of conduct.
            <HStack marginTop="4">
              <Button
                as={NextLink}
                href="https://docs.google.com/document/d/1Ll22vZ5qLo-Kv9BxSqLr-8yhGeqlbY_MHYDOC9QsrUQ/edit?usp=sharing"
                colorScheme="facebook"
                variant="outline"
                size="sm"
                target="_blank"
              >
                Read our Rules
              </Button>
              <Button
                as={NextLink}
                href="https://docs.google.com/document/d/1hcIr2lurCkcoqcgIw-wb03yuB-YVBTP94KbR4VpDj0g/edit?usp=sharing"
                colorScheme="facebook"
                variant="outline"
                size="sm"
                target="_blank"
              >
                Read our Code of Conduct
              </Button>
            </HStack>
          </Text>

          <Stack spacing="14">
            <FormControl isInvalid={errors.name} isRequired>
              <FormLabel htmlFor="name" fontSize="xl">
                What&apos;s your name?
              </FormLabel>
              <Input id="name" {...register("name", { required: true })} />
              <FormHelperText fontSize="lg">
                Since this community focuses on building personal relationships,
                we&apos;d like to at least know your name. You don&apos;t have
                to put in your full name; a nickname (like something you&apos;d
                use at work, not a typical internet handle) also works.
              </FormHelperText>
              <FormErrorMessage>
                {errors.name && requiredString}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.email} isRequired>
              <FormLabel htmlFor="email" fontSize="xl">
                What&apos;s your email?
              </FormLabel>
              <Input type="email" {...register("email", { required: true })} />
              <FormHelperText fontSize="lg">
                This email will only be used to send a follow-up email.
              </FormHelperText>
              <FormErrorMessage>
                {errors.email && requiredString}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.social} isRequired>
              <FormLabel htmlFor="social" fontSize="xl">
                Do you have any social links or a website we can check out?{" "}
              </FormLabel>
              <Input {...(register("social"), { required: true })} />
              <FormHelperText fontSize="lg">
                Please provide at least one link to your website, LinkedIn,
                Twitter, Mastodon, etc. This lets us get an idea of who you are
                and what you&apos;re about and lets us know you&apos;re active
                online!
              </FormHelperText>
              <FormErrorMessage>{errors.social}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.pronouns}>
              <FormLabel htmlFor="pronouns" fontSize="xl">
                What are your pronouns?
              </FormLabel>
              <Input {...register("pronouns")} />
              <FormHelperText fontSize="lg">
                This is optional, but... why are we asking for this? Because
                pronouns are essential! And we want to address and acknowledge
                you properly.
              </FormHelperText>
              <FormErrorMessage>{errors.pronouns}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.discord}>
              <FormLabel htmlFor="discord" fontSize="xl">
                What&apos;s your Discord username?
              </FormLabel>
              <Input {...register("discord")} />
              <FormHelperText fontSize="lg">
                If you&apos;ve already got a Discord username, this helps us
                connect the dots during the application & invite process.
              </FormHelperText>
              <FormErrorMessage>{errors.discord}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.sector} isRequired>
              <FormLabel htmlFor="sector" fontSize="xl">
                When it comes to the Tech Industry, what do you most closely
                align with?{" "}
              </FormLabel>
              <Controller
                rules={{ required: true }}
                render={({ field }) => (
                  <RadioGroup onChange={field.onChange} value={field.value}>
                    <Stack spacing="4">
                      <Radio
                        ref={field.ref}
                        value="Development / Engineering"
                        size="lg"
                      >
                        Development / Engineering
                      </Radio>

                      <Radio ref={field.ref} value="Design / UX" size="lg">
                        Design / UX
                      </Radio>

                      <Radio
                        ref={field.ref}
                        value="Product Management / Strategy"
                        size="lg"
                      >
                        Product Management / Strategy
                      </Radio>

                      <Radio
                        ref={field.ref}
                        value="Leadership / Management"
                        size="lg"
                      >
                        Leadership / Management
                      </Radio>

                      <Radio
                        ref={field.ref}
                        value="Student / Teacher / Education"
                        size="lg"
                      >
                        Student / Teacher / Education
                      </Radio>

                      <Radio ref={field.ref} value="Other" size="lg">
                        Other
                      </Radio>
                    </Stack>
                  </RadioGroup>
                )}
                control={control}
                name="sector"
              />
              <FormHelperText fontSize="lg">
                If none seem to fit, just hit that &quot;other&quot; field;
                we&apos;d like you to at least be in the orbit of the Tech
                Industry here in Denver.
              </FormHelperText>
              <FormErrorMessage>
                {errors.sector && requiredString}
              </FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.area} isRequired>
              <FormLabel htmlFor="area" fontSize="xl">
                What area of Denver are you located in?
              </FormLabel>
              <Input {...register("area", { required: true })} />
              <FormHelperText fontSize="lg">
                Membership is free; it requires that you&apos;re actually in the
                Greater Denver area, so let us know where you&apos;re from! Not
                sure if you&apos;re in the Greater Denver area? Just reply with
                roughly where you&apos;re at, and we&apos;ll get it figured out.
              </FormHelperText>
              <FormErrorMessage>{errors.area}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.reason} isRequired>
              <FormLabel htmlFor="reason" fontSize="xl">
                Why do you want to join us?
              </FormLabel>
              <Textarea {...register("reason", { required: true })} />
              <FormErrorMessage>{errors.url}</FormErrorMessage>
            </FormControl>

            <FormControl isInvalid={errors.agreement} isRequired>
              <FormLabel htmlFor="agreement" fontSize="xl">
                I agree to engage in a kind, considerate and respectful manner
                with other community members.
              </FormLabel>
              <FormHelperText fontSize="lg">
                We want this place to be fun, engaging, and entertaining - but
                we also want it to be safe. So please ensure you&apos;re coming
                here with the best intentions.
              </FormHelperText>
              <Checkbox
                {...register("agreement", { required: true })}
                size="lg"
                marginTop="3"
              >
                I agree
              </Checkbox>

              <FormErrorMessage>{errors.agreement}</FormErrorMessage>
            </FormControl>

            {isSubmitting ? (
              <Button isLoading loadingText="Submitting" variant="outline">
                Submitting, please wait
              </Button>
            ) : (
              <Button
                disabled={false}
                type="submit"
                colorScheme="messenger"
                size="lg"
              >
                Apply for membership
              </Button>
            )}
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default MembershipApplication;