<?php

/* display/results/value_display.twig */
class __TwigTemplate_5a59245a903bad30cf216a57a1f9c371221ba23996d3b6016647285b1ae7a4dd extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        // line 1
        echo "<td class=\"left ";
        echo twig_escape_filter($this->env, (isset($context["class"]) ? $context["class"] : null), "html", null, true);
        echo (((isset($context["condition_field"]) ? $context["condition_field"] : null)) ? (" condition") : (""));
        echo "\">
    ";
        // line 2
        echo (isset($context["value"]) ? $context["value"] : null);
        echo "
</td>
";
    }

    public function getTemplateName()
    {
        return "display/results/value_display.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  25 => 2,  19 => 1,);
    }

    /** @deprecated since 1.27 (to be removed in 2.0). Use getSourceContext() instead */
    public function getSource()
    {
        @trigger_error('The '.__METHOD__.' method is deprecated since version 1.27 and will be removed in 2.0. Use getSourceContext() instead.', E_USER_DEPRECATED);

        return $this->getSourceContext()->getCode();
    }

    public function getSourceContext()
    {
        return new Twig_Source("", "display/results/value_display.twig", "/home/crustaceankeys/public_html/phpmyadmin/templates/display/results/value_display.twig");
    }
}
